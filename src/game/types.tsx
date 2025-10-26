export type Vec2 = { x: number; y: number };

export type Player = {
  pos: Vec2;
  vel: Vec2;
  life: number;
  speed: number;
  size: number;
  barked: boolean;
  barkedRecently: boolean;
  barkedTimer: number;
  barkedDisplayTimer: number;
  barkedRadius: number;
};

export type Companion = {
  pos: Vec2;
  vel: Vec2;
  size: number;
  speed: number;
  following: boolean;
};

export interface Enemy {
  pos: Vec2;
  vel: Vec2;
  life?: number;
  size: number;
  speed: number;
  type: "chaser" | "patroller" | "charger";
  damage?: number;
  feared: boolean;
}

export type World = {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  dpr: number;
  timeAlive: number;
  nextRampTime: number;
  size: { w: () => number; h: () => number };
  keys: Set<string>;
  previousKeys: Set<string>;
  player: Player;
  enemies: Enemy[];
  companion: Companion[];
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
  score: number;
};
