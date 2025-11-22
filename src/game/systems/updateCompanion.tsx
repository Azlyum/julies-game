import type { World } from "../types";

export function updateCompanion(world: World, dt: number) {
  const { player, companion } = world;
  const t = performance.now() / 1000;

  for (const c of companion) {
    const baseOffsetX = -20 * player.facing;
    const baseOffsetY = -10;

    const bobAmount = 3;
    const bobSpeed = 4;
    const bobY = Math.sin(t * bobSpeed) * bobAmount;

    const targetX = player.pos.x + baseOffsetX;
    const targetY = player.pos.y + baseOffsetY + bobY;

    const dirX = targetX - c.pos.x;
    const dirY = targetY - c.pos.y;
    const dist = Math.hypot(dirX, dirY) || 1;
    const nx = dirX / dist;
    const ny = dirY / dist;

    const followSpeed = c.speed * 2;
    c.pos.x += nx * followSpeed * dt;
    c.pos.y += ny * followSpeed * dt;
    c.facingLeft = player.facing === -1;

    const pulseSpeed = 5;
    c.glowPhase += dt * pulseSpeed;

    const frameDuration = 0.12;
    c.animTimer += dt;

    if (c.animTimer >= frameDuration) {
      c.animTimer -= frameDuration;
      c.animFrame = (c.animFrame + 1) % 4;
    }
  }
}
