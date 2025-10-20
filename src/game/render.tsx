import type { World } from "./types";
import { drawGrid } from "./grid";

export function render(world: World) {
  const { ctx } = world;
  const w = world.size.w();
  const h = world.size.h();

  ctx.clearRect(0, 0, w, h);

  // grid
  drawGrid(ctx, w, h);

  // player
  ctx.fillStyle = "#7dd3fc";
  ctx.fillRect(
    world.player.pos.x,
    world.player.pos.y,
    world.player.size,
    world.player.size
  );

  // enemies
  ctx.fillStyle = "#f87171";
  for (const e of world.enemies) {
    ctx.fillRect(e.pos.x, e.pos.y, e.size, e.size);
  }

  // HUD hint
  ctx.font = "16px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto";
  ctx.fillStyle = "#94a3b8";
  ctx.fillText("Move: WASD / Arrow Keys", 12, h - 12);

  if (world.gameState === "gameOver") {
    ctx.fillStyle = "#e5e7eb";
    ctx.font =
      "bold 28px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto";
    ctx.fillText("Game Over", w / 2 - 80, h / 2);
  }
}
