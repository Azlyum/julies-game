import { ENEMY_SIZE, ENEMY_SPEED, ENEMY_DAMAGE } from "../constants";
import type { World } from "../types";

export function spawnAndRamp(world: World, dt: number) {
  if (!(world.running && !world.idle && world.spawningActive)) return;

  const { player } = world;

  if (world.companion.length === 0) {
    world.companion.push({
      pos: { x: player.pos.x - 20, y: player.pos.y - 10 },
      speed: player.speed / 3.5,
      animFrame: 0,
      animTimer: 0,
      facingLeft: false,
      vel: {
        x: 0,
        y: 0,
      },
      size: 32,
      following: false,
      side: 0,
      trailPositions: [0, 0, 0, 0],
      glowPhase: 0,
    });
  }

  world.timeAlive += dt;
  world.spawnTimer += dt;
  world.score += dt * 10;

  if (world.timeAlive > world.nextRampTime) {
    world.nextRampTime += 30;
    world.targetCount += 10;
    world.spawnInterval *= 0.9;
  }

  if (
    world.spawnTimer >= world.spawnInterval &&
    world.spawnedCount < world.targetCount
  ) {
    const enemyTypes: Array<"chaser" | "patroller" | "hulk"> = [
      "chaser",
      "patroller",
      "hulk",
    ];
    const spawnType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];

    const edge = Math.floor(Math.random() * 4);
    const spawnPos = { x: 0, y: 0 };

    switch (edge) {
      case 0:
        spawnPos.x = Math.random() * world.size.w();
        spawnPos.y = -ENEMY_SIZE[spawnType];
        break;
      case 1:
        spawnPos.x = world.size.w() + ENEMY_SIZE[spawnType];
        spawnPos.y = Math.random() * world.size.h();
        break;
      case 2:
        spawnPos.x = Math.random() * world.size.w();
        spawnPos.y = world.size.h() + ENEMY_SIZE[spawnType];
        break;
      case 3:
        spawnPos.x = -ENEMY_SIZE[spawnType];
        spawnPos.y = Math.random() * world.size.h();
        break;
    }

    const dx = world.player.pos.x - spawnPos.x;
    const initialFacing = dx >= 0 ? 1 : -1;

    world.enemies.push({
      pos: spawnPos,
      vel: { x: 0, y: 0 },
      size: ENEMY_SIZE[spawnType],
      speed: ENEMY_SPEED[spawnType],
      damage: ENEMY_DAMAGE[spawnType],
      type: spawnType,
      feared: false,
      animFrame: 0,
      animTimer: 0,
      facing: initialFacing,
    });

    world.spawnedCount++;
    world.spawnTimer = 0;
  }
}
