// background.ts
let bgImg: HTMLImageElement | null = null;
let bgLoaded = false;

export function background(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
) {
  if (!bgImg) {
    bgImg = new Image();

    bgImg.src = "/pictures/background.png";

    bgImg.onload = () => {
      bgLoaded = true;
    };

    return;
  }

  if (!bgLoaded) return;

  ctx.drawImage(bgImg, 0, 0, w, h);
}
