// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors

import { CompositeLayer, Layer, DefaultProps } from '@deck.gl/core';
import { TileLayer, TileLayerProps } from '@deck.gl/geo-layers';
import { MVTLayer, MVTLayerProps } from '@deck.gl/geo-layers';
import { BitmapLayer, GeoJsonLayer } from '@deck.gl/layers';

import type { Feature, BinaryFeatureCollection } from '@loaders.gl/schema';
import type { TileSource } from '@loaders.gl/loader-utils';
import type { ImageTileSource, VectorTileSource } from '@loaders.gl/loader-utils';

import { createDataSource } from '@loaders.gl/core';
import { PMTilesSource } from '@loaders.gl/pmtiles';
import { MVTSource } from '@loaders.gl/mvt';

// deck.gl audit while working on TileSourceLayer
// - PropTypes system undocumented, not even typescript comments, hard to understand
//
// - MVTLayer - doesn't allow override if tileSource.getTileData?
// - MVTLayer - does it support overriding renderSubLayers? TBD
// - MVTLayer - uniquePropertyId vs highlightedFeatureId - why named differently (propertyId vs featureId)?
//    (featureId or rowId is better if we take the tabular view... property subobject is GeoJSON specific)
// - MVTLayer - ability to support non-local coordinates?
// - MVTLayer docs - slightly high context, overly compact wording.
//
// - TileLayer
//   - Should we upstream TileSource support into the TileLayer. As a (recommended?) alternative to 'getTileData()`?
//   - Offer better ad-hoc / template type Sources?
//   - getTileData() - somewhat confusing props. Offer a `getTile()` more aligned with
//
// - Tileset2D
//   - Construct Tileset2D directly from a TileSource, instead of overriding getTileData()?
//   - Could we share TileSource between Tileset2Ds?
//   - Could we share Tileset2D between layers?

/** TODO - Internal helper layer: MVTLayer doesn't allow override if tileSource.getTileData? */
type MVTSourceLayerProps = Omit<MVTLayerProps, 'data'> & {
  data: VectorTileSource;
};

/** TODO - Internal helper layer: MVTLayer doesn't allow override if tileSource.getTileData? */
class MVTSourceLayer extends MVTLayer {
  static defaultProps: DefaultProps<MVTSourceLayerProps> = {
    data: { type: 'object', optional: false, value: null, async: false },
  };

  updateState(params) {
    super.updateState(params);

    const { props, changeFlags } = params;
    if (changeFlags.dataChanged && props.data) {
      this.setState({
        vectorTileSource: props.data,
        // TODO - add support for binary VectorTileSources
        binary: false,
      });
    }
  }

  async getTileData(parameters: any): Promise<Feature[] | BinaryFeatureCollection> {
    const vectorTileSource = this.state.vectorTileSource;
    const tile = await vectorTileSource.getTileData(parameters);
    return tile;
  }

  renderSubLayers(props: TileSourceLayerProps & { tile: { index; bbox: { west; south; east; north } } }) {
    const layers = super.renderSubLayers(props);
    return layers;
  }
}

export type TileSourceLayerProps = Omit<TileLayerProps, 'data'> & {
  /** A source of vector or image tiles */
  tileSource: string; // TileSource<any>;
  /** Show borders around tiles. Currently only works in 'tile' mode */
  /** A unique id for each feature/row. Associates parts of a geometry in different tiles. */
  uniquePropertyId?: string;
  /** The currently highlighted unique property id */
  highlightedFeatureId?: string;
};

/**
 * A deck.gl layer that renders a tile source
 * Auto discovers type of content (vector tile, bitmap, ...)
 * Can render debug borders around tiles
 * TODO
 *   - More robust support for switching TileSources.
 */
export class TileSourceLayer extends CompositeLayer<TileSourceLayerProps> {
  static layerName = 'TileSourceLayer';
  static defaultProps = {
    ...TileLayer.defaultProps,
    layerMode: 'tile',
  };

  initializeState() {
    this.setState({
      tileSource: null,
    });
  }

  updateState({ props }: { props: TileSourceLayerProps }) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const tileSource: TileSource = createPMTileSource(props.tileSource);
    this.setState({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      tileSource,
    });
  }

  renderLayers() {
    const tileSource: TileSource = this.state.tileSource;

    if (!tileSource) {
      return null;
    }

    if (this.sourceSupportsMVTLayer()) {
      // TODO - Currently only TileSource that supports CRS override is TableTileSource
      // @ts-expect-error
      tileSource.props.coordinates = 'local';
      return this.renderMVTLayer();
    }

    // TODO - Currently only TileSource that supports CRS override is TableTileSource
    // @ts-expect-error
    tileSource.props.coordinates = 'wgs84';
    return this.renderTileLayer();
  }

  // INTERNAL METHODS

  /** Check if the current source supports MVT layer (vector tiles with local coordinates) */
  sourceSupportsMVTLayer(): boolean {
    // TODO - use tilesource from props or state???
    const { tileSource } = this.state;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (
      // @ts-expect-error localCoordinates property on sources is a HACK
      tileSource.mimeType === 'application/vnd.mapbox-vector-tile' && tileSource.localCoordinates
    );
  }

  /** Best rendering of vector tiles is through MVTLayer. However local coordinate support is needed */
  renderMVTLayer() {
    // TODO - use tilesource from props or state???
    const { metadata, onTilesLoad } = this.props;
    const minZoom = metadata?.minZoom || 0;
    const maxZoom = metadata?.maxZoom || 30;
    const { tileSource } = this.state;

    const devicePixelRatio = this.context.device.getCanvasContext().getDevicePixelRatio();

    return [
      new MVTSourceLayer({
        // HACK: Trigger new layer via id prop to force clear tile cache
        id: String(tileSource?.url),
        data: tileSource,

        getLineColor: [0, 0, 0],
        getLineWidth: 1,
        getFillColor: [100, 120, 140],
        lineWidthUnits: 'pixels',
        pickable: true,
        autoHighlight: true,

        onViewportLoad: onTilesLoad,

        minZoom,
        maxZoom,
        tileSize: 256,
        // TOOD - why is this needed?
        zoomOffset: devicePixelRatio === 1 ? -1 : 0,

        // Custom prop
        // tileSource,
      }),
    ];
  }

  /** TileLayer configured to render both image tiles and vector tiles */
  renderTileLayer() {
    const { metadata, onTilesLoad } = this.props;
    const { tileSource }: { tileSource: TileSource } = this.state;
    const minZoom = metadata?.minZoom || 0;
    const maxZoom = metadata?.maxZoom || 30;

    return [
      new TileLayer({
        // HACK: Trigger new layer via id prop to force clear tile cache
        // TODO - not sufficient, we need better mechanism
        id: String(tileSource.url),
        // TODO - should we upstream tile source support into the TileLayer?
        getTileData: tileSource.getTileData,
        // Assume the pmtiles file support HTTP/2, so we aren't limited by the browser to a certain number per domain.
        maxRequests: 20,
        pickable: true,
        onViewportLoad: onTilesLoad,
        minZoom,
        maxZoom,
        tileSize: 256,
        // TOOD - why is this needed?
        zoomOffset: devicePixelRatio === 1 ? -1 : 0,
        renderSubLayers,
        // Custom prop
        tileSource,
      }),
    ];
  }
}

interface Tile {
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  tileSource: VectorTileSource | ImageTileSource;
  tile: {
    index: {
      z: number;
    };
    bbox: {
      west: number;
      south: number;
      east: number;
      north: number;
    };
  };
}

/**
 * Sublayer render callback for the top-level TileLayer
 * Renders:
 * GeoJSONLayer for vector tiles
 *  BitmapLayer for image tiles
 *  PathLayer for debug borders
 */
function renderSubLayers(props: TileSourceLayerProps & Tile) {
  const {
    tileSource,
    tile: {
      bbox: { west, south, east, north },
    },
  } = props;

  const layers: Layer[] = [];

  switch (tileSource.mimeType) {
    case 'application/vnd.mapbox-vector-tile':
      layers.push(
        new GeoJsonLayer({
          id: `${props.id}-geojson`,
          data: props.data,
          pickable: true,
          autoHighlight: true,
          lineWidthScale: 500,
          lineWidthMinPixels: 0.5,
          getFillColor: [100, 120, 140, 255],
          highlightColor: [0, 0, 200, 255],
        }),
      );
      break;

    case 'image/png':
    case 'image/jpeg':
    case 'image/webp':
    case 'image/avif':
      layers.push(
        new BitmapLayer(props, {
          data: null,
          image: props.data,
          bounds: [west, south, east, north],
          pickable: true,
        }),
      );
      break;

    default:
      console.error('Unknown tile mimeType', tileSource?.mimeType);
  }

  return layers;
}

/** Create a source from the example url */
export function createPMTileSource(url: string): TileSource {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return createDataSource(url, [PMTilesSource, MVTSource], {});
}
