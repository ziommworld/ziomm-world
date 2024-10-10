import { DateTime } from "luxon";
import { cloneDeep } from 'lodash';

import { GamePhase, GameState } from "../$game";
import { GameMapCoordinate } from "../$map";
import { GameCharacter, GameCharacterConfig, GameCharacterState } from "../$character";
import { GameActionConfig, checkAP, getConfigsDict } from ".";

// ===================== COMMON =====================

export const $recalcInitiative = (activeCharacters: GameCharacter[]) => {
  return (state: GameState) => {
    const { characters, npcs } = cloneDeep(state.scenario);
    const activeConfigs = getConfigsDict<GameCharacterConfig>(activeCharacters);

    // reset initiative to -1
    Object.values(characters).forEach((char) => {
      char.initiative = -1;
    });

    Object.values(npcs).forEach((npc) => {
      npc.initiative = -1;
    });

    // recalculate initiative
    const newCharactersSequence = Object.entries(characters)
      .filter(
        ([id, char]) => char.position && !char.isDead && !char.hidden
      ).sort(
        ([id1, char1], [id2, char2]) => char2.initiative - char1.initiative
      ).map(
        ([id, char]) => id
      );

    const newNPCsSequence = Object.entries(npcs)
      .filter(
        ([id, char]) => char.position && !char.isDead && !char.hidden
      ).sort(
        ([id1, char1], [id2, char2]) => activeConfigs[id2].powerLvl - activeConfigs[id1].powerLvl
      ).map(
        ([id, char]) => id
      );

    // set new initiative
    newCharactersSequence.forEach((id, idx) => {
      characters[id].initiative = idx + 1;
    });

    newNPCsSequence.forEach((id, idx) => {
      npcs[id].initiative = idx + 1;
    });

    return {
      scenario: {
        ...state.scenario,
        characters,
        npcs
      }
    } as Partial<GameState>;
  };
}

export const $setUpdatedOn = () => {
  return (state: GameState) => {
    return {
      updatedOn: DateTime.now().toMillis()
    } as Partial<GameState>;
  };
}

export const $setEndedOn = () => {
  return (state: GameState) => {
    return {
      endedOn: DateTime.now().toMillis()
    } as Partial<GameState>;
  };
}

// ===================== PREGAME =====================

export const $changeInitiative = (charIds: string[]) => {
  return (state: GameState) => {
    const characters = cloneDeep(state.scenario.characters);

    charIds.forEach((id, idx) => {
      characters[id] = {
        ...characters[id],
        initiative: idx + 1,
      };
    });

    return {
      scenario: {
        ...state.scenario,
        characters
      }
    } as Partial<GameState>;
  };
}

export const $placeCharacter = (charId: string, position: GameMapCoordinate) => {
  return (state: GameState) => {
    const scenario = cloneDeep(state.scenario);
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
            position,
            map: activeMap
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
    } as Partial<GameState>;
  };
};

export const $displaceCharacter = (position: GameMapCoordinate) => {
  return (state: GameState) => {
    const { activeMap, maps, characters } = cloneDeep(state.scenario);
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
    } as Partial<GameState>;
  };
};

// ===================== PLAYERS =====================

export const $beginGame = () => {
  return (state: GameState) => {

    return {
      phase: GamePhase.InGame,
    } as Partial<GameState>;
  }
}

export const $beginRound = (activeCharacters: GameCharacter[]) => {
  return (state: GameState) => {
    const { characters } = cloneDeep(state.scenario);

    const activeConfigs = getConfigsDict<GameCharacterConfig>(activeCharacters);

    const updatedCharacters = Object.entries(characters).reduce(
      (rec, [id, character]) => {
        const updatedCharacter = {
          ...character,
          currentAP: activeConfigs[id].defaultAP + (character.bonusAP ?? 0),
          bonusAP: null
        };

        rec[id] = updatedCharacter;
        return rec;
      },
      {} as Record<string, GameCharacterState>
    );

    return {
      scenario: {
        ...state.scenario,
        characters: updatedCharacters,
      }
    };
  };
};

export const $beginTurn = () => {
  return (state: GameState) => {


    return {

    } as Partial<GameState>;
  };
};

export const $endTurn = () => {
  return (state: GameState) => {
    const nextTurn = cloneDeep(state.scenario).currentTurn + 1;

    return {
      scenario: {
        ...state.scenario,
        currentTurn: nextTurn,
      }
    } as Partial<GameState>;
  };
}

export const $endRound = () => {
  return (state: GameState) => {
    const nextRound = cloneDeep(state.scenario).currentRound + 1;

    return {
      scenario: {
        ...state.scenario,
        currentRound: nextRound,
        currentTurn: 1,
      }
    } as Partial<GameState>;
  };
};

export const $endGame = () => {
  return (state: GameState) => {

    return {
      phase: GamePhase.PostGame,
    } as Partial<GameState>;
  };
};

// ===================== CHARACTERS =====================

export const $moveCharacter = (charId: string, destination: GameMapCoordinate, cost: number) => {
  return (state: GameState) => {
    const { activeMap, maps, characters } = cloneDeep(state.scenario);
    const { tiles } = maps[activeMap];
    const character = characters[charId];
    const origin = character.position!;

    tiles[origin.y][origin.x].characterId = undefined;
    tiles[destination.y][destination.x].characterId = charId;

    const newAP = character.currentAP - cost;

    if (newAP < 0) {
      throw new Error('Insufficient AP');
    }

    return {
      scenario: {
        ...state.scenario,
        characters: {
          ...characters,
          [charId]: {
            ...character,
            position: destination,
            currentAP: newAP
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
    } as Partial<GameState>;
  }
}

export const $characterAction = (characterId: string, actionConfig: GameActionConfig) => {
  return (state: GameState) => {
    const { characters } = cloneDeep(state.scenario);
    const character = characters[characterId];

    // TODO update state
    const actionState = character.actions[actionConfig.id];

    return {
      scenario: {
        ...state.scenario,
        characters: {
          ...characters,
          [characterId]: {
            ...character,
            bonusAP: false
          }
        }
      }
    } as Partial<GameState>;
  };
}

// ===================== ACTIONS =====================

export const $actionWait = (characterId: string, waitConfig: GameActionConfig) => {
  return (state: GameState) => {
    const { characters } = cloneDeep(state.scenario);
    const character = characters[characterId];

    // TODO update state
    const waitState = characters[characterId].actions[waitConfig.id];

    checkAP(character.currentAP, waitConfig.baseAP);

    return {
      scenario: {
        ...state.scenario,
        characters: {
          ...characters,
          [characterId]: {
            ...character,
            currentAP: character.currentAP - waitConfig.baseAP,
            bonusAP: 1
          } as GameCharacterState
        }
      }
    } as Partial<GameState>;
  };
}

export const $actionPass = (characterId: string, passConfig: GameActionConfig) => {
  return (state: GameState) => {
    const { characters } = cloneDeep(state.scenario);
    const character = characters[characterId];

    // TODO update state
    const passState = characters[characterId].actions[passConfig.id];

    checkAP(character.currentAP, passConfig.baseAP);

    return {
      scenario: {
        ...state.scenario,
        characters: {
          ...characters,
          [characterId]: {
            ...characters[characterId],
            currentAP: character.currentAP - passConfig.baseAP,
            bonusAP: 2
          }
        }
      }
    } as Partial<GameState>;
  };
}
