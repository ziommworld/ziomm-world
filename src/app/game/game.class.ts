import { Character } from "../character";

export class Game {
  private characters: Character[] = [];

  constructor() {

  }

  public addCharacter(character: Character) {
    this.characters.push(character);
  }

  public removeCharacter(character: Character) {
    const index = this.characters.indexOf(character);
    this.characters.splice(index, 1);
  }

  public getCharacters() {
    return this.characters;
  }

  public getCharacterById(id: string) {
    return this.characters.find(character => character.id === id);
  }
}
