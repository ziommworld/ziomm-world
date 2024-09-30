import { BaseMapConfig, TerrainType } from 'src/app/$map';


const rows = 20;
const cols = 20;

const mainTerrain = TerrainType.Desert;

const terrain = Array.from({ length: rows, }, (_, row) =>
  Array.from({ length: cols }, (_, col) =>
    mainTerrain
  )
);

terrain[0][0] = TerrainType.Spawn;
terrain[0][cols - 1] = TerrainType.Spawn;
terrain[rows - 1][0] = TerrainType.Spawn;
terrain[rows - 1][cols - 1] = TerrainType.Spawn;

// ===================== DEF =====================

export const medium: BaseMapConfig = {
  name: 'Medium',
  size: { rows, cols },

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
