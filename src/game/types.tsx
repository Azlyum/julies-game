export type Vec2 = { x: number; y: number };

export type Player = {
  pos: Vec2;
  vel: Vec2;
  speed: number;
  size: number;
};

export type Enemy = { x: number; y: number; size: number };

export type World = {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  dpr: number;
  size: { w: () => number; h: () => number };
  keys: Set<string>;
  player: Player;
  enemies: Enemy[];
  tPrev: number;
  running: boolean;
  gameOver: boolean;
};
