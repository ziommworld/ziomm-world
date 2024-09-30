import { GameState } from "../$game";


export const doDmg = () => {
  return (state: GameState) => {
    const char0Id = Object.keys(state.scenario.characters)[0];

    return {
      scenario: {
        ...state.scenario,
        characters: {
          ...state.scenario.characters,
          [char0Id]: {
            ...state.scenario.characters[char0Id],
            currentHP: state.scenario.characters[char0Id].currentHP - 1,
          }
        }
      }
    };
  }
};
