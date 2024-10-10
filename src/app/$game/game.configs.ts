import { GameDraft } from ".";
import { GameCharacterTeam } from "../$character";


export const quickGameDraft: GameDraft = {
  players: ['P1', 'P2'],
  characters: [
    {
      character: 'ratdogBoss',
      player: 'Kris',
      team: GameCharacterTeam.Team1
    },
    {
      character: 'marauderBoss',
      player: 'Milen',
      team: GameCharacterTeam.Enemy
    },
  ],
  scenario: 'test',
  settings: {
    difficulty: 100,
    time: 120,
    rounds: 30,
  }
}
