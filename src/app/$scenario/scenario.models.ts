export interface ScenarioState {

}

export interface ScenarioConfig {
  maxCharacters: number;
}

export type ScenarioKey =
  'test' |
  'arena';

export type ScenarioLibrary = Record<ScenarioKey, ScenarioConfig>;
