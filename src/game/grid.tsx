import { GRID_SPACING } from "./constants";

export function drawGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  ctx.globalAlpha = 0.2;
  for (let x = 0; x < width; x += GRID_SPACING) ctx.fillRect(x, 0, 1, height);
  for (let y = 0; y < height; y += GRID_SPACING) ctx.fillRect(0, y, width, 1);
  ctx.globalAlpha = 1;
}
