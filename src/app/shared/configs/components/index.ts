import { GameComponentLibrary } from "src/app/$component";
import { wall, damagedWall, reinforcedWall } from "./edge/wall.configs";
import { basicWindow, reinforcedWindow } from "./edge/window.configs";
import { rock, jaggedRock } from "./terrain/rock.configs";
import { door } from "./edge/door.configs";


export const components: GameComponentLibrary = {
  wall,
  damagedWall,
  reinforcedWall,
  basicWindow,
  reinforcedWindow,
  door,
  rock,
  jaggedRock,
}
