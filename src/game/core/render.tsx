import type { World } from "../types";
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

  // companion
  ctx.fillStyle = "#34d399";
  for (const c of world.companion) {
    ctx.fillRect(c.pos.x, c.pos.y, c.size, c.size);
  }

  // player barked
  if (world.player.barkedDisplayTimer > 0) {
    const size = world.player.size;
    const cx = world.player.pos.x + size / 2;
    const cy = world.player.pos.y - size;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }

  // HUD hint
  ctx.font = "16px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto";
  ctx.fillStyle = "#94a3b8";
  ctx.fillText("Move: WASD / Arrow Keys", 12, h - 12);
}
