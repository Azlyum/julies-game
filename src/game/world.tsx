import type { World } from "./types";
import {
  PLAYER_SIZE,
  PLAYER_SPEED,
  PLAYER_LIFE,
  ENEMY_SPAWN_INTERVAL,
  ENEMY_COUNT,
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
    idle: true,
    running: false,
    gameOver: false,
    onGameOver: () => {},
    spawnTimer: 0,
    spawnInterval: ENEMY_SPAWN_INTERVAL,
    spawningActive: false,
    spawnedCount: 0,
    targetCount: ENEMY_COUNT,
  };

  return world;
}
