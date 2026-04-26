export const MAP_WIDTH = 20;
export const MAP_HEIGHT = 20;

export type TileCoord = {
  row: number;
  col: number;
};

export type GameMap = {
  width: number;
  height: number;
};

export function createMap(): GameMap {
  return {
    width: MAP_WIDTH,
    height: MAP_HEIGHT
  };
}

export function isInsideMap(map: GameMap, coord: TileCoord): boolean {
  return (
    coord.row >= 0 &&
    coord.col >= 0 &&
    coord.row < map.height &&
    coord.col < map.width
  );
}
