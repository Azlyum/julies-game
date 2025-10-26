import type { World } from "../types";

export function handleBark(world: World, dt: number) {
  const { player, enemies } = world;

  if (player.barked && !player.barkedRecently) {
    player.barked = false;
    player.barkedRecently = true;
    player.barkedDisplayTimer = 0.2;
    player.barkedTimer = 5;
    for (const e of enemies) e.feared = true;

    setTimeout(() => {
      player.barkedRecently = false;
    }, 5000);
  }

  if (player.barkedDisplayTimer > 0) {
    player.barkedDisplayTimer -= dt;
  }

  if (player.barkedTimer > 0) {
    player.barkedTimer -= dt;
  }
}
