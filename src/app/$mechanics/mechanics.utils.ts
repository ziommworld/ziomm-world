import { GameState } from "../$game";
import { GameMapCoordinate } from "../$map";
import { cloneDeep } from 'lodash';


export const $changeInitiative = (charIds: string[]) => {
  return (state: GameState) => {
    const updatedCharacters = { ...state.scenario.characters };

    charIds.forEach((id, idx) => {
      updatedCharacters[id] = {
        ...updatedCharacters[id],
        initiative: idx,
      };
    });

    return {
      scenario: {
        ...state.scenario,
        characters: updatedCharacters
      }
    };
  };
}

export const $placeCharacter = (charId: string, position: GameMapCoordinate) => {
  return (state: GameState) => {
    const { scenario } = state;
    const { activeMap, maps, characters } = scenario;
    const { tiles } = maps[activeMap];

    const updatedTiles = [
      ...tiles.slice(0, position.y),
      [
        ...tiles[position.y].slice(0, position.x),
        {
          ...tiles[position.y][position.x],
          characterId: charId
        },
        ...tiles[position.y].slice(position.x + 1)
      ],
      ...tiles.slice(position.y + 1)
    ];

    return {
      scenario: {
        ...scenario,
        characters: {
          ...characters,
          [charId]: {
            ...characters[charId],
            position
          }
        },
        maps: {
          ...maps,
          [activeMap]: {
            ...maps[activeMap],
            tiles: updatedTiles
          }
        }
      }
    };
  };
};

export const $displaceCharacter = (position: GameMapCoordinate) => {
  return (state: GameState) => {
    const { activeMap, maps, characters } = state.scenario;
    const { tiles } = maps[activeMap];
    const characterId = tiles[position.y][position.x].characterId!;

    return {
      scenario: {
        ...state.scenario,
        characters: {
          ...characters,
          [characterId]: {
            ...characters[characterId],
            position: undefined
          }
        },
        maps: {
          ...maps,
          [activeMap]: {
            ...maps[activeMap],
            tiles: [
              ...tiles.slice(0, position.y),
              [
                ...tiles[position.y].slice(0, position.x),
                {
                  ...tiles[position.y][position.x],
                  characterId: undefined
                },
                ...tiles[position.y].slice(position.x + 1)
              ],
              ...tiles.slice(position.y + 1)
            ]
          }
        }
      }
    };
  };
};

export const $moveCharacter = (charId: string, destination: GameMapCoordinate) => {
  return (state: GameState) => {
    const { activeMap, maps, characters } = cloneDeep(state.scenario);
    const { tiles } = maps[activeMap];
    const character = characters[charId];
    const origin = character.position!;

    tiles[origin.y][origin.x].characterId = undefined;
    tiles[destination.y][destination.x].characterId = charId;

    return {
      scenario: {
        ...state.scenario,
        characters: {
          ...characters,
          [charId]: {
            ...character,
            position: destination
          }
        },
        maps: {
          ...maps,
          [activeMap]: {
            ...maps[activeMap],
            tiles
          }
        }
      }
    };
  }
}
