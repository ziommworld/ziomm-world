import { BaseMapConfig, TerrainType } from 'src/app/$map';


export const medium: BaseMapConfig = {
  name: 'Medium',

  terrain: [
    [
      TerrainType.Plains
    ]
  ],
  components: [
    ['rock', { anchor: { x: 1, y: 1 }, direction: 'north' }],
  ],
  events: [
    'wind'
  ],
};
