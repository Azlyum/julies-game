export function computeDPR() {
  return Math.max(1, Math.floor(window.devicePixelRatio || 1));
}

export function fitCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  dpr: number
) {
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.floor(rect.width * dpr);
  canvas.height = Math.floor(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

export function attachResize(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  getDpr: () => number
) {
  const onResize = () => fitCanvas(canvas, ctx, getDpr());
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}
