import type { World } from "../types";

export function updateCompanion(world: World, dt: number) {
  const { player, companion } = world;

  for (const c of companion) {
    const orbitRadius = 25;
    const orbitSpeed = 1;
    const t = performance.now() / 1000;

    const targetX = player.pos.x + Math.cos(t * orbitSpeed) * orbitRadius;
    const targetY = player.pos.y + Math.sin(t * orbitSpeed) * orbitRadius;

    const dirX = targetX - c.pos.x;
    const dirY = targetY - c.pos.y;
    const dist = Math.hypot(dirX, dirY) || 1;
    const nx = dirX / dist;
    const ny = dirY / dist;

    const followSpeed = c.speed * 0.8;
    c.pos.x += nx * followSpeed * dt;
    c.pos.y += ny * followSpeed * dt;
  }
}
