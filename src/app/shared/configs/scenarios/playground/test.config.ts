import { ScenarioConfig } from "src/app/$scenario";


export const test: ScenarioConfig = {
  name: 'Test',
  minCharacters: 2,
  maxCharacters: 2,
  defaultTurns: 10,

  initialMap: 'small',

  maps: [],
  npcs: [],
}
