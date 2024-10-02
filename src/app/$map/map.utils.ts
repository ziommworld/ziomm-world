import { GameMapCoordinate, GameMapSize } from ".";


/**
 * "Chess" coordinates <=> (0, 0) is bottom left
 *
 * X-axis shows east,
 * Y-axis shows north
 */
export const coord2chess = (coord: GameMapCoordinate, size: GameMapSize): string => {
  const north = size.rows - coord.y;
  const east = coord.x + 1;

  return `N${north}:E${east}`;
}

export const chess2coord = (chess: string, size: GameMapSize): GameMapCoordinate => {
  const north = parseInt(chess.match(/N(\d+)/)?.[1] ?? '0', 10);
  const east = parseInt(chess.match(/E(\d+)/)?.[1] ?? '0', 10);

  const x = east - 1;
  const y = size.rows - north;

  return { x, y };
}
