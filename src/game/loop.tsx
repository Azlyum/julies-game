import type { World } from "./types";
import { MAX_DT } from "./constants";

export function startLoop(
  world: World,
  update: (w: World, dt: number) => void,
  render: (w: World) => void
) {
  let raf = 0;

  function frame(tNow: number) {
    if (!world.running && !world.gameOver) return;
    const dt = Math.min(MAX_DT, (tNow - world.tPrev) / 1000);
    world.tPrev = tNow;

    update(world, dt);
    render(world);

    if (world.running) raf = requestAnimationFrame(frame);
  }

  raf = requestAnimationFrame(frame);

  return () => cancelAnimationFrame(raf);
}
