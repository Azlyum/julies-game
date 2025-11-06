export const GRID_SPACING = 20;

export const PLAYER_SIZE = 18;
export const PLAYER_SPEED = 180;
export const PLAYER_LIFE = 3;

export const ENEMY_SIZE = { chaser: 14, patroller: 18, charger: 22 };
export const ENEMY_COUNT = 20;
export const ENEMY_SPAWN_INTERVAL = 1; // seconds between spawns
export const ENEMY_SPEED = { chaser: 160, patroller: 100, charger: 70 };
export const ENEMY_DAMAGE = { chaser: 1, patroller: 2, charger: 3 };

export const MAX_DT = 0.033; // 33ms clamp

export const BARK_RADIUS = 140;
export const FEAR_SPEED_MULT = 1.5;
