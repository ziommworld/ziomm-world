import { BaseMapConfig, TerrainType } from "src/app/$map";


const size = 10;

const rows = size;
const cols = size;

const mainTerrain = TerrainType.Plains;

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

export const small: BaseMapConfig = {
  name: 'Small',
  size: { rows, cols },

  terrain,

  components: [

  ],
  events: [

  ],
};
