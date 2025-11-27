import type { World } from "../types";
import { background } from "./background";

export function render(world: World) {
  const { ctx } = world;
  const w = world.size.w();
  const h = world.size.h();
  const barkReady = world.player.barkedDisplayTimer <= 0;

  ctx.clearRect(0, 0, w, h);

  background(ctx, w, h);

  const players = Array.isArray(world.player) ? world.player : [world.player];
  for (const p of players) {
    if (!world.playerSprites.run.loaded) continue;
    const sprite = world.playerSprites.run;
    const barkedSprite = world.playerSprites.bark;
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

    if (p.barkedDisplayTimer > 0 && p.facing === 1) {
      ctx.drawImage(barkedSprite.image, sx, sy, sw, sh, drawX, drawY, dw, dh);
    } else if (p.facing === -1 && p.barkedDisplayTimer > 0) {
      ctx.translate(drawX + dw / 2, drawY + dh / 2);
      ctx.scale(-1, 1);
      ctx.drawImage(
        barkedSprite.image,
        sx,
        sy,
        sw,
        sh,
        -dw / 2,
        -dh / 2,
        dw,
        dh
      );
    } else if (p.facing === 1) {
      ctx.drawImage(sprite.image, sx, sy, sw, sh, drawX, drawY, dw, dh);
    } else {
      ctx.translate(drawX + dw / 2, drawY + dh / 2);
      ctx.scale(-1, 1);
      ctx.drawImage(sprite.image, sx, sy, sw, sh, -dw / 2, -dh / 2, dw, dh);
    }

    ctx.restore();
  }

  for (const e of world.enemies) {
    if (!world.enemySprites.loaded) continue;
    const eSprite = world.enemySprites;

    const frameIndex = e.animFrame ?? 0;
    const sx = frameIndex * eSprite.frameW;
    const sy = 0;
    const sw = eSprite.frameW;
    const sh = eSprite.frameH;

    const scale = 0.05;
    const dw = sw * scale;
    const dh = sh * scale;
    const drawX = e.pos.x - dw / 2;
    const drawY = e.pos.y - dh / 2;

    let img: HTMLImageElement;
    if (e.type === "chaser") {
      img = eSprite.chaser.image;
    } else if (e.type === "patroller") {
      img = eSprite.patroller.image;
    } else {
      img = eSprite.hulk.image;
    }

    ctx.save();

    if (e.facing === 1) {
      ctx.drawImage(img, sx, sy, sw, sh, drawX, drawY, dw, dh);
    } else {
      ctx.translate(drawX + dw / 2, drawY + dh / 2);
      ctx.scale(-1, 1);
      ctx.drawImage(img, sx, sy, sw, sh, -dw / 2, -dh / 2, dw, dh);
    }

    ctx.restore();
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

    if (barkReady && !world.player.barkedRecently) {
      const glowColor = "#ffeea8";
      const glowIntensity = (Math.sin(c.glowPhase) + 1) / 2;
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 15 + glowIntensity * 7;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }

    if (c.facingLeft) {
      ctx.translate(drawX + dw / 2, drawY + dh / 2);
      ctx.scale(-1, 1);
      ctx.drawImage(sprite.image, sx, sy, sw, sh, -dw / 2, -dh / 2, dw, dh);
    } else {
      ctx.drawImage(sprite.image, sx, sy, sw, sh, drawX, drawY, dw, dh);
    }

    ctx.restore();
  }
}
