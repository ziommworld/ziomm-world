import { BaseScenarioConfig } from '../..';


export const test: BaseScenarioConfig = {
  name: 'Test',

  minCharacters: 2,
  maxCharacters: 2,

  initialMap: 'small',
  defaultTurns: 10,

  npcs: [
    'beetle',
    'beetle',
  ],
  maps: [
    'small',
    'medium',
  ],
};
