
import { BaseScenarioConfig } from 'src/app/$scenario/scenario.models';


export const arena: BaseScenarioConfig = {
  name: 'Arena',

  minCharacters: 2,
  maxCharacters: 4,

  initialMap: 'small',
  defaultRounds: 20,

  npcs: [
  ],
  maps: [
    'small',
  ],
  events: [

  ],
};
