import {
  goblinScreamSound,
  pigOinkSound,
  scaredHogSound,
} from "../sound/audioManager";
import type { World } from "../types";

export function updateEnemies(world: World, dt: number) {
  const { enemies, player } = world;

  for (let i = enemies.length - 1; i >= 0; i--) {
    const e = enemies[i];

    if (e.feared) {
      const dirX = e.pos.x - player.pos.x;
      const dirY = e.pos.y - player.pos.y;
      const len = Math.hypot(dirX, dirY) || 1;
      const nx = dirX / len;
      const ny = dirY / len;
      e.pos.x += nx * e.speed * dt * 2;
      e.pos.y += ny * e.speed * dt * 2;
    } else {
      const dirX = player.pos.x - e.pos.x;
      const dirY = player.pos.y - e.pos.y;
      const len = Math.hypot(dirX, dirY) || 1;
      const nx = dirX / len;
      const ny = dirY / len;
      e.pos.x += nx * e.speed * dt;
      e.pos.y += ny * e.speed * dt;
    }

    if (e.feared && !e.hasScreamed && e.type === "chaser") {
      goblinScreamSound.play();
      e.hasScreamed = true;
    } else if (e.feared && !e.hasScreamed && e.type === "patroller") {
      scaredHogSound.play();
      e.hasScreamed = true;
    } else if (e.feared && !e.hasScreamed && e.type === "hulk") {
      pigOinkSound.play();
      e.hasScreamed = true;
    }

    if (
      e.pos.x < -e.size ||
      e.pos.y < -e.size ||
      e.pos.x > world.size.w() + e.size ||
      e.pos.y > world.size.h() + e.size
    ) {
      enemies.splice(i, 1);
      world.spawnedCount--;
      world.score += 50;
    }
  }
}
