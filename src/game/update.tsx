import type { World } from "./types";
import { clamp, aabbOverlap } from "./collision";

export function update(world: World, dt: number) {
  if (!world.running || world.gameOver) return;

  const { player, keys } = world;

  // movement
  player.vel.x = 0;
  player.vel.y = 0;
  if (keys.has("arrowleft") || keys.has("a")) player.vel.x -= player.speed;
  if (keys.has("arrowright") || keys.has("d")) player.vel.x += player.speed;
  if (keys.has("arrowup") || keys.has("w")) player.vel.y -= player.speed;
  if (keys.has("arrowdown") || keys.has("s")) player.vel.y += player.speed;

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

  // collision with any enemy → game over once
  for (const e of world.enemies) {
    if (aabbOverlap(player, e)) {
      world.gameOver = true;
      world.running = false;
      break;
    }
  }
}
