const canvas = document.getElementById('game') as HTMLCanvasElement;
canvas.width = 800;
canvas.height = 600;

const ctx = canvas.getContext('2d')!;
ctx.fillStyle = '#222';
ctx.fillRect(0, 0, canvas.width, canvas.height);
