export interface ScenarioState {

}

export interface ScenarioConfig {
  name: string;
  minCharacters: number;
  maxCharacters: number;
  defaultTurns: number;
}

export type ScenarioKey =
  'test' |
  'arena';

export type ScenarioLibrary = Record<ScenarioKey, ScenarioConfig>;
