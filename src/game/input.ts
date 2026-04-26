import { GameMap, TileCoord, isInsideMap } from './map';
import { TILE_HEIGHT, TILE_WIDTH, tileToScreen } from './render';

const HALF_TILE_WIDTH = TILE_WIDTH / 2;
const HALF_TILE_HEIGHT = TILE_HEIGHT / 2;

export function pickTileFromScreen(
  map: GameMap,
  screenX: number,
  screenY: number,
  originX: number,
  originY: number
): TileCoord | null {
  const localX = screenX - originX;
  const localY = screenY - originY;

  const approxCol = Math.floor((localX / HALF_TILE_WIDTH + localY / HALF_TILE_HEIGHT) / 2);
  const approxRow = Math.floor((localY / HALF_TILE_HEIGHT - localX / HALF_TILE_WIDTH) / 2);

  const candidates: TileCoord[] = [
    { row: approxRow, col: approxCol },
    { row: approxRow + 1, col: approxCol },
    { row: approxRow, col: approxCol + 1 },
    { row: approxRow - 1, col: approxCol },
    { row: approxRow, col: approxCol - 1 }
  ];

  for (const candidate of candidates) {
    if (!isInsideMap(map, candidate)) {
      continue;
    }

    const center = tileToScreen(candidate.row, candidate.col, originX, originY);
    if (isPointInTile(screenX, screenY, center.x, center.y)) {
      return candidate;
    }
  }

  return null;
}

function isPointInTile(
  pointX: number,
  pointY: number,
  centerX: number,
  centerY: number
): boolean {
  const dx = Math.abs(pointX - centerX);
  const dy = Math.abs(pointY - centerY);
  return dx / HALF_TILE_WIDTH + dy / HALF_TILE_HEIGHT <= 1;
}
