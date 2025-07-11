import * as layers from '@deck.gl/layers';
import { JSONConverter } from '@deck.gl/json';
import { TitilerLayer } from './TitilerLayer';
import { TileSourceLayer } from './PMTilesLayer';

const configuration = {
  classes: {
    ...layers,
    TitilerLayer: TitilerLayer,
    TileSourceLayer: TileSourceLayer,
  },
};

export const jsonConverter = new JSONConverter({ configuration });
