import type { World } from "../types";
import { clamp } from "../utils/collision";

export function handlePlayerInput(world: World, dt: number) {
  const { player, keys } = world;

  // movement keys
  player.vel.x = 0;
  player.vel.y = 0;
  if (keys.has("arrowleft") || keys.has("a")) player.vel.x -= player.speed;
  if (keys.has("arrowright") || keys.has("d")) player.vel.x += player.speed;
  if (keys.has("arrowup") || keys.has("w")) player.vel.y -= player.speed;
  if (keys.has("arrowdown") || keys.has("s")) player.vel.y += player.speed;

  // bark input edge (justPressed logic can live here too)
  const justPressed = (key: string) =>
    world.keys.has(key) && !world.previousKeys.has(key);

  if (
    (justPressed("b") ||
      justPressed(" ") ||
      justPressed("Space") ||
      justPressed("Spacebar")) &&
    !player.barkedRecently
  ) {
    player.barked = true;
  }

  // apply movement with clamp
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
}
