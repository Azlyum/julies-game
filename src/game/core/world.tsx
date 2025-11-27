import type { World } from "../types";

export function createWorld(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  dpr: number
): World {
  const companionImg = new Image();
  const playerIdle = new Image();
  const playerRun = new Image();
  const playerBark = new Image();
  const enemySprites = {
    chaser: new Image(),
    patroller: new Image(),
    hulk: new Image(),
  };

  companionImg.src = "./sprites/julieSprite.png";
  playerIdle.src = "./sprites/idle.png";
  playerRun.src = "./sprites/dogRunning.png";
  playerBark.src = "./sprites/barking.png";

  enemySprites.chaser.src = "./sprites/goblin.png";
  enemySprites.patroller.src = "./sprites/warthog.png";
  enemySprites.hulk.src = "./sprites/ogre.png";

  const world: World = {
    canvas,
    ctx,
    dpr,
    size: {
      w: () => canvas.width / dpr,
      h: () => canvas.height / dpr,
    },
    keys: new Set(),
    previousKeys: new Set(),
    player: {
      pos: { x: 180, y: 180 },
      vel: { x: 0, y: 0 },
      speed: 180,
      size: 18,
      life: 3,
      barked: false,
      barkedRecently: false,
      barkedDisplayTimer: 0,
      barkedTimer: 0,
      facing: 0,
      animFrame: 0,
      animTimer: 0,
      isBarking: false,
    },
    enemies: [],
    companion: [],
    idle: true,
    running: false,
    spawningActive: false,
    gameOver: false,
    onGameOver: () => {},
    spawnTimer: 0,
    spawnInterval: 1,
    spawnedCount: 0,
    targetCount: 20,
    timeAlive: 0,
    nextRampTime: 60,
    score: 0,
    tPrev: 0,
    companionSprite: {
      image: companionImg,
      frameW: 1024,
      frameH: 1024,
      loaded: false,
    },

    playerSprites: {
      idle: {
        image: playerIdle,
        frameW: 1024,
        frameH: 1024,
        loaded: false,
      },
      run: {
        image: playerRun,
        frameW: 1024,
        frameH: 1024,
        loaded: false,
      },
      bark: {
        image: playerBark,
        frameW: 1024,
        frameH: 1024,
        loaded: false,
      },
    },
    enemySprites: {
      chaser: {
        image: enemySprites.chaser,
      },
      patroller: {
        image: enemySprites.patroller,
      },
      hulk: {
        image: enemySprites.hulk,
      },
      frameW: 1024,
      frameH: 1024,
      loaded: false,
    },
  };

  companionImg.onload = () => {
    world.companionSprite.loaded = true;
  };
  playerIdle.onload = () => {
    world.playerSprites.idle.loaded = true;
  };
  playerRun.onload = () => {
    world.playerSprites.run.loaded = true;
  };
  playerBark.onload = () => {
    world.playerSprites.bark.loaded = true;
  };
  enemySprites.chaser.onload = () => {
    world.enemySprites.loaded = true;
  };
  enemySprites.patroller.onload = () => {
    world.enemySprites.loaded = true;
  };
  enemySprites.hulk.onload = () => {
    world.enemySprites.loaded = true;
  };

  return world;
}
