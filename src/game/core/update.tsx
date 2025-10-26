import { checkCollisions } from "../systems/checkCollisions";
import { handleBark } from "../systems/handleBark";
import { handlePlayerInput } from "../systems/handlePlayerInput";
import { spawnAndRamp } from "../systems/spawnAndRamp";
import { updateCompanion } from "../systems/updateCompanion";
import { updateEnemies } from "../systems/updateEnemies";
import type { World } from "../types";

export function update(world: World, dt: number) {
  if (!world.running || world.gameOver) return;

  handlePlayerInput(world, dt);

  if (!world.idle) {
    spawnAndRamp(world, dt);
    updateEnemies(world, dt);
    updateCompanion(world, dt);
    handleBark(world, dt);
    checkCollisions(world);
  }

  world.previousKeys = new Set(world.keys);
}
