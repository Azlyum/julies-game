import { checkCollisions } from "../systems/checkCollisions";
import { handleBark } from "../systems/handleBark";
import { updatePlayer } from "../systems/updatePlayer";
import { spawnAndRamp } from "../systems/spawnAndRamp";
import { updateCompanion } from "../systems/updateCompanion";
import { updateEnemies } from "../systems/updateEnemies";
import type { World } from "../types";

export function update(world: World, dt: number) {
  if (!world.running || world.gameOver) return;

  updatePlayer(world, dt);

  if (!world.idle) {
    spawnAndRamp(world, dt);
    updateEnemies(world, dt);
    updateCompanion(world, dt);
    handleBark(world, dt);
    checkCollisions(world);
  }

  world.previousKeys = new Set(world.keys);
}
