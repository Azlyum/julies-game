import type { World } from "../types";

export function handleBark(world: World, dt: number) {
  const { player, enemies } = world;

  // trigger bark if pressed and not on cooldown
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

  // visual timer (for render flash)
  if (player.barkedDisplayTimer > 0) {
    player.barkedDisplayTimer -= dt;
  }

  // cooldown timer (for UI / feel)
  if (player.barkedTimer > 0) {
    player.barkedTimer -= dt;
  }
}
