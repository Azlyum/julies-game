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
  isBarking: boolean;
  animFrame: number;
  animTimer: number;
  facing: number;
};

export type Companion = {
  pos: Vec2;
  vel: Vec2;
  size: number;
  speed: number;
  following: boolean;
  facingLeft: boolean;
  animFrame: number;
  animTimer: number;
  side: number;
  glowPhase: number;
  trailPositions: [x: number, y: number, intensity: number, life: number];
};
export interface Enemy {
  pos: Vec2;
  vel: Vec2;
  life?: number;
  size: number;
  speed: number;
  type: "chaser" | "patroller" | "hulk";
  damage?: number;
  feared: boolean;
  hasScreamed?: boolean;
  animFrame: number;
  animTimer: number;
  facing: number;
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
  companionSprite: {
    image: HTMLImageElement;
    frameW: number;
    frameH: number;
    loaded: boolean;
  };
  playerSprites: {
    idle: {
      image: HTMLImageElement;
      frameW: number;
      frameH: number;
      loaded: boolean;
    };
    run: {
      image: HTMLImageElement;
      frameW: number;
      frameH: number;
      loaded: boolean;
    };
    bark: {
      image: HTMLImageElement;
      frameW: number;
      frameH: number;
      loaded: boolean;
    };
  };
  enemySprites: {
    frameW: number;
    frameH: number;
    loaded: boolean;
    chaser: {
      image: HTMLImageElement;
    };
    patroller: {
      image: HTMLImageElement;
    };
    hulk: {
      image: HTMLImageElement;
    };
  };
};
