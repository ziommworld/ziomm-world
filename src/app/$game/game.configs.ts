import { GameDraft } from ".";


export const quickGameDraft: GameDraft = {
  players: ['P1', 'P2'],
  characters: [
    {
      character: 'neo',
      player: 'Kris'
    },
    {
      character: 'beetle',
      player: 'Milen'
    },
  ],
  scenario: 'test',
  settings: {
    difficulty: 100,
    time: 120,
    turns: 30,
  }
}
