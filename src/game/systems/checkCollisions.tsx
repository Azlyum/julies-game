import type { World } from "../types";
import { collision } from "../utils/collision";

export function checkCollisions(world: World) {
  const { player, enemies } = world;

  for (const e of enemies) {
    if (collision(player, e)) {
      world.gameOver = true;
      world.running = false;
      world.onGameOver?.();
      break;
    }
  }
}
