import type { World } from "../types";
// import { drawGrid } from "./grid";

export function render(world: World) {
  const { ctx } = world;
  const w = world.size.w();
  const h = world.size.h();

  ctx.clearRect(0, 0, w, h);

  // drawGrid(ctx, w, h);

  ctx.fillStyle = "#7dd3fc";
  const players = Array.isArray(world.player) ? world.player : [world.player];
  //running
  for (const p of players) {
    if (!world.playerSprites.run.loaded) continue;
    const sprite = world.playerSprites.run;
    const frameIndex = p.animFrame ?? 0;
    const sx = frameIndex * sprite.frameW;
    const sy = 0;
    const sw = sprite.frameW;
    const sh = sprite.frameH;
    const scale = 0.05;
    const dw = sw * scale;
    const dh = sh * scale;
    const drawX = p.pos.x - dw / 2;
    const drawY = p.pos.y - dh / 2;
    const ctx = world.ctx;
    ctx.save();

    if (p.facing === 1) {
      ctx.drawImage(sprite.image, sx, sy, sw, sh, drawX, drawY, dw, dh);
    } else {
      ctx.translate(drawX + dw / 2, drawY + dh / 2);
      ctx.scale(-1, 1);
      ctx.drawImage(sprite.image, sx, sy, sw, sh, -dw / 2, -dh / 2, dw, dh);
    }

    ctx.restore();
  }

  ctx.fillStyle = "#f87171";
  for (const e of world.enemies) {
    ctx.fillRect(e.pos.x, e.pos.y, e.size, e.size);
  }

  for (const c of world.companion) {
    if (!world.companionSprite.loaded) continue;

    const sprite = world.companionSprite;

    const frameIndex = c.animFrame ?? 0;
    const sx = frameIndex * sprite.frameW;
    const sy = 0;
    const sw = sprite.frameW;
    const sh = sprite.frameH;

    const scale = 0.03;
    const dw = sw * scale;
    const dh = sh * scale;

    const drawX = c.pos.x - dw / 2;
    const drawY = c.pos.y - dh / 2;

    const ctx = world.ctx;
    ctx.save();

    if (c.facingLeft) {
      ctx.translate(drawX + dw / 2, drawY + dh / 2);
      ctx.scale(-1, 1);
      ctx.drawImage(sprite.image, sx, sy, sw, sh, -dw / 2, -dh / 2, dw, dh);
    } else {
      ctx.drawImage(sprite.image, sx, sy, sw, sh, drawX, drawY, dw, dh);
    }

    ctx.restore();
  }

  if (world.player.barkedDisplayTimer > 0) {
    const size = world.player.size;
    const cx = world.player.pos.x + size / 2;
    const cy = world.player.pos.y - size;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.font = "16px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto";
  ctx.fillStyle = "#94a3b8";
  ctx.fillText("Move: WASD / Arrow Keys", 12, h - 12);
}
