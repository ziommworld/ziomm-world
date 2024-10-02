
import { BaseScenarioConfig } from 'src/app/$scenario/scenario.models';


export const arena: BaseScenarioConfig = {
  name: 'Arena',

  minCharacters: 2,
  maxCharacters: 4,

  initialMap: 'small',
  defaultTurns: 20,

  npcs: [
  ],
  maps: [
    'small',
  ],
  events: [

  ],
};
