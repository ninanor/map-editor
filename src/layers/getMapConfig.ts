import * as layers from '@deck.gl/layers';
import { JSONConverter } from '@deck.gl/json';
import { TitilerLayer } from './TitilerLayer';

const configuration = {
  classes: {
    ...layers,
    TitilerLayer: TitilerLayer,
  },
};

export const jsonConverter = new JSONConverter({ configuration });
