import type { World } from "./types";
import {
  ENEMY_COUNT,
  ENEMY_SIZE,
  PLAYER_SIZE,
  PLAYER_SPEED,
} from "./constants";

export function createWorld(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  dpr: number
): World {
  const world: World = {
    canvas,
    ctx,
    dpr,
    size: {
      w: () => canvas.width / dpr,
      h: () => canvas.height / dpr,
    },
    keys: new Set(),
    player: {
      pos: { x: 60, y: 60 },
      vel: { x: 0, y: 0 },
      speed: PLAYER_SPEED,
      size: PLAYER_SIZE,
    },
    enemies: [],
    tPrev: performance.now(),
    running: true,
    gameOver: false,
  };

  // static enemies (created once)
  for (let i = 0; i < ENEMY_COUNT; i++) {
    const x = Math.random() * (world.size.w() - ENEMY_SIZE);
    const y = Math.random() * (world.size.h() - ENEMY_SIZE);
    world.enemies.push({ x, y, size: ENEMY_SIZE });
  }

  return world;
}
