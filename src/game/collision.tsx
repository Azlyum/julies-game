import type { Enemy, Player } from "./types";

export function collision(p: Player, e: Enemy) {
  const pLeft = p.pos.x;
  const pRight = p.pos.x + p.size;
  const pTop = p.pos.y;
  const pBottom = p.pos.y + p.size;

  const eLeft = e.pos.x;
  const eRight = e.pos.x + e.size;
  const eTop = e.pos.y;
  const eBottom = e.pos.y + e.size;

  return pRight > eLeft && pLeft < eRight && pBottom > eTop && pTop < eBottom;
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
