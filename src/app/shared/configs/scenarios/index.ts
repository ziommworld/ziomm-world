import { ScenarioLibrary } from "src/app/$scenario";


export const scenarios: ScenarioLibrary = {
  test: {
    name: 'Test',
    minCharacters: 2,
    maxCharacters: 2,
    defaultTurns: 10,
  },
  arena: {
    name: 'Arena',
    minCharacters: 2,
    maxCharacters: 4,
    defaultTurns: 20,
  },
}
