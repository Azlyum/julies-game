export type Vec2 = { x: number; y: number };

export type Player = {
  pos: Vec2;
  vel: Vec2;
  life: number;
  speed: number;
  size: number;
};

export interface Enemy {
  pos: Vec2;
  vel: Vec2;
  life?: number;
  size: number;
  speed: number;
  type: "chaser" | "patroller" | "charger";
  damage?: number;
}

export type World = {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  dpr: number;
  size: { w: () => number; h: () => number };
  keys: Set<string>;
  player: Player;
  enemies: Enemy[];
  tPrev: number;
  idle: boolean;
  running: boolean;
  gameOver: boolean;
  onGameOver: () => void;
  spawnTimer: number;
  spawnInterval: number;
  spawningActive: boolean;
  spawnedCount: number;
  targetCount: number;
};
