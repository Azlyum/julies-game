import type { World } from "./types";
import { clamp, collision } from "./collision";
import { ENEMY_DAMAGE, ENEMY_SIZE, ENEMY_SPEED } from "./constants";

export function update(world: World, dt: number) {
  if (!world.running || world.gameOver) return;

  const { player, keys, enemies } = world;

  // movement
  player.vel.x = 0;
  player.vel.y = 0;
  if (keys.has("arrowleft") || keys.has("a")) player.vel.x -= player.speed;
  if (keys.has("arrowright") || keys.has("d")) player.vel.x += player.speed;
  if (keys.has("arrowup") || keys.has("w")) player.vel.y -= player.speed;
  if (keys.has("arrowdown") || keys.has("s")) player.vel.y += player.speed;
  if (keys.has("spacebar") || keys.has("b")) player.barked = true;

  player.pos.x = clamp(
    player.pos.x + player.vel.x * dt,
    0,
    world.size.w() - player.size
  );
  player.pos.y = clamp(
    player.pos.y + player.vel.y * dt,
    0,
    world.size.h() - player.size
  );

  // enemy movement
  if (!world.idle) {
    if (world.running && !world.idle && world.spawningActive) {
      // handle enemy spawning
      world.spawnTimer += dt;
      if (
        world.spawnTimer >= world.spawnInterval &&
        world.spawnedCount < world.targetCount
      ) {
        // spawn enemy
        const enemyTypes: Array<"chaser" | "patroller" | "charger"> = [
          "chaser",
          "patroller",
          "charger",
        ];
        const spawnType =
          enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
        const spawnPos = {
          x: Math.random() * world.size.w(),
          y: -ENEMY_SIZE[spawnType],
        };
        world.enemies.push({
          pos: spawnPos,
          vel: { x: 0, y: 0 },
          size: ENEMY_SIZE[spawnType],
          speed: ENEMY_SPEED[spawnType],
          damage: ENEMY_DAMAGE[spawnType],
          type: spawnType,
          feared: false,
        });
        world.spawnedCount++;
        world.spawnTimer = 0;
      }
    }

    // enemies follow player
    for (const e of enemies) {
      const dirX = player.pos.x - e.pos.x;
      const dirY = player.pos.y - e.pos.y;
      const length = Math.hypot(dirX, dirY) || 1;
      const normX = dirX / length;
      const normY = dirY / length;
      e.pos.x += normX * e.speed * dt;
      e.pos.y += normY * e.speed * dt;
    }
    // handle barking
    if (player.barked) {
      player.barked = false;
      for (const e of enemies) {
        e.feared = true;
      }
    }

    // collision with any enemy → game over once
    for (const e of enemies) {
      if (collision(player, e)) {
        world.gameOver = true;
        world.running = false;
        world.onGameOver?.();
        break;
      }
      if (e.feared) {
        const dirX = e.pos.x - player.pos.x;
        const dirY = e.pos.y - player.pos.y;
        const length = Math.hypot(dirX, dirY) || 1;
        const normX = dirX / length;
        const normY = dirY / length;
        e.pos.x += normX * e.speed * dt * 1.5; // flee faster
        e.pos.y += normY * e.speed * dt * 1.5;

        //remove enemies that have fled off screen
        if (
          e.pos.x < -e.size ||
          e.pos.y < -e.size ||
          e.pos.x > world.size.w() + e.size ||
          e.pos.y > world.size.h() + e.size
        ) {
          const index = enemies.indexOf(e);
          if (index > -1) {
            enemies.splice(index, 1);
            world.spawnedCount--;
          }
        }
      }
    }
  }
}
