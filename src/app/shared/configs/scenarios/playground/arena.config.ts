import { ScenarioConfig } from "src/app/$scenario";


export const arena: ScenarioConfig = {
  name: 'Arena',
  minCharacters: 2,
  maxCharacters: 4,
  defaultTurns: 20,

  initialMap: 'small',

  maps: [],
  npcs: [],
}
