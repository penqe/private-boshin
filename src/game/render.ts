import { GameMap, TileCoord } from './map';

export const TILE_WIDTH = 64;
export const TILE_HEIGHT = 32;

const HALF_TILE_WIDTH = TILE_WIDTH / 2;
const HALF_TILE_HEIGHT = TILE_HEIGHT / 2;

type RenderOptions = {
  map: GameMap;
  selectedTile: TileCoord | null;
};

export function renderMap(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  options: RenderOptions
): void {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#1d1f21';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const origin = getMapOrigin(canvas, options.map);

  for (let row = 0; row < options.map.height; row += 1) {
    for (let col = 0; col < options.map.width; col += 1) {
      const center = tileToScreen(row, col, origin.x, origin.y);
      const isSelected =
        options.selectedTile?.row === row && options.selectedTile?.col === col;

      drawDiamond(ctx, center.x, center.y, isSelected ? '#f2c14e' : '#6ba292');
    }
  }
}

export function getMapOrigin(canvas: HTMLCanvasElement, map: GameMap): { x: number; y: number } {
  return {
    x: canvas.width / 2,
    y: Math.max(50, canvas.height / 2 - (map.height * HALF_TILE_HEIGHT) / 2)
  };
}

export function tileToScreen(
  row: number,
  col: number,
  originX: number,
  originY: number
): { x: number; y: number } {
  return {
    x: (col - row) * HALF_TILE_WIDTH + originX,
    y: (col + row) * HALF_TILE_HEIGHT + originY
  };
}

function drawDiamond(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  fillColor: string
): void {
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - HALF_TILE_HEIGHT);
  ctx.lineTo(centerX + HALF_TILE_WIDTH, centerY);
  ctx.lineTo(centerX, centerY + HALF_TILE_HEIGHT);
  ctx.lineTo(centerX - HALF_TILE_WIDTH, centerY);
  ctx.closePath();

  ctx.fillStyle = fillColor;
  ctx.fill();

  ctx.strokeStyle = '#2f4f4f';
  ctx.lineWidth = 1;
  ctx.stroke();
}
