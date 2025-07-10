import { _Tile2DHeader, TileLayer } from '@deck.gl/geo-layers';
import { BitmapLayer } from '@deck.gl/layers';

type TitilerLayerProps = {
  data: {
    titiler: string;
    colormap_name?: string;
    url: string;
    rescale?: number[];
    bidx?: number | number[];
  };
};

export class TitilerLayer extends TileLayer {
  constructor(props: TitilerLayerProps) {
    const { titiler = location.origin + '/titiler', bidx = 1, ...other } = props.data;
    const url = new URL(titiler);
    url.pathname += '/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x';
    if (Array.isArray(bidx)) {
      bidx.forEach(index => {
        url.searchParams.append('bidx', index.toString());
      });
    } else {
      url.searchParams.append('bidx', bidx.toString());
    }
    Object.entries(other).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });

    super({
      ...props,
      data: decodeURIComponent(url.toString()),
    });
  }

  renderSubLayers(
    props: TitilerLayerProps & {
      id: string;
      data: unknown;
      tile: _Tile2DHeader<unknown>;
    },
  ) {
    const { boundingBox } = props.tile;

    return new BitmapLayer(props, {
      data: null,
      image: props.data,
      bounds: [boundingBox[0][0], boundingBox[0][1], boundingBox[1][0], boundingBox[1][1]],
    });
  }
}
