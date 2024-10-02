import { GameComponentLib } from "src/app/$component";

import { rock, jaggedRock } from "./block/rock.configs";
import { wall, damagedWall, reinforcedWall } from "./edge/wall.configs";
import { basicWindow, reinforcedWindow } from "./edge/window.configs";
import { door } from "./edge/door.configs";


export const components: GameComponentLib = {
  wall,
  damagedWall,
  reinforcedWall,
  basicWindow,
  reinforcedWindow,
  door,
  rock,
  jaggedRock,
}
