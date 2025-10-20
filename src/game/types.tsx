export type Vec2 = { x: number; y: number; size?: number };

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
  spawnTime?: number;
  type?: "chaser" | "patroller" | "charger";
}

export type GameState = "running" | "paused" | "gameOver";

export type World = {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  dpr: number;
  size: { w: () => number; h: () => number };
  keys: Set<string>;
  player: Player;
  enemies: Enemy[];
  tPrev: number;
  gameState: GameState;
  idle: boolean;
  running: boolean;
  gameOver: boolean;
  onGameOver: () => void;
};
