import { BARK_RADIUS } from "../constants";
import { barkSound } from "../sound/audioManager";
import type { World } from "../types";

export function handleBark(world: World, dt: number) {
  const { player, enemies } = world;

  if (player.barked && !player.barkedRecently) {
    barkSound.play();
    player.barked = false;
    player.barkedRecently = true;
    player.barkedDisplayTimer = 0.2;
    player.barkedTimer = 5;
    for (const e of enemies) {
      const distance = Math.hypot(
        e.pos.x - player.pos.x,
        e.pos.y - player.pos.y
      );
      if (distance <= BARK_RADIUS) e.feared = true;
    }

    setTimeout(() => {
      player.barkedRecently = false;
    }, 1200);
  }

  if (player.barkedDisplayTimer > 0) {
    player.barkedDisplayTimer -= dt;
  }

  if (player.barkedTimer > 0) {
    player.barkedTimer -= dt;
  }
}
