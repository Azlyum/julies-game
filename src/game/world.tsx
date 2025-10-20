import type { World } from "./types";
import {
  ENEMY_COUNT,
  ENEMY_SIZE,
  PLAYER_SIZE,
  PLAYER_SPEED,
  ENEMY_SPEED,
  PLAYER_LIFE,
  ENEMY_TICK_INTERVAL,
  ENEMY_SPAWN_MARGIN,
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
      pos: { x: 180, y: 180 },
      vel: { x: 0, y: 0 },
      speed: PLAYER_SPEED,
      size: PLAYER_SIZE,
      life: PLAYER_LIFE,
    },
    enemies: [],
    tPrev: performance.now(),
    gameState: "running" as "running" | "paused" | "gameOver",
    idle: false,
    running: true,
    gameOver: false,
    onGameOver: () => {},
  };

  // static enemies (created once)
  for (let i = 0; i < ENEMY_COUNT; i++) {
    const x = Math.random() * (world.size.w() - ENEMY_SIZE);
    const y = Math.random() * (world.size.h() - ENEMY_SIZE);
    if (ENEMY_SPAWN_MARGIN !== new Date().getTime() % ENEMY_TICK_INTERVAL) {
      world.enemies.push({
        pos: { x, y },
        vel: { x: 0, y: 0 },
        size: ENEMY_SIZE,
        speed: ENEMY_SPEED,
      });
    }
  }

  return world;
}
