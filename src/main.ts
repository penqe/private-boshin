import { pickTileFromScreen } from './game/input';
import { createMap, TileCoord } from './game/map';
import { getMapOrigin, renderMap } from './game/render';

const canvas = document.getElementById('game') as HTMLCanvasElement;
canvas.width = 960;
canvas.height = 720;

const ctx = canvas.getContext('2d');
if (!ctx) {
  throw new Error('Canvas 2D context is not available.');
}

const map = createMap();
let selectedTile: TileCoord | null = null;

function draw(): void {
  renderMap(ctx, canvas, { map, selectedTile });
}

canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;

  const origin = getMapOrigin(canvas, map);
  selectedTile = pickTileFromScreen(map, clickX, clickY, origin.x, origin.y);
  draw();
});

draw();
