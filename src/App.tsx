import React, { useEffect, useRef, useState } from "react";
import "./App.css";

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [message] = useState("For Julie ❤️");

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let running = true;

    const DPR = Math.max(1, Math.floor(window.devicePixelRatio || 1));

    function fitCanvas() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * DPR);
      canvas.height = Math.floor(rect.height * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    fitCanvas();
    const onResize = () => fitCanvas();
    window.addEventListener("resize", onResize);

    const world = {
      size: { w: () => canvas.width / DPR, h: () => canvas.height / DPR },
      keys: new Set<string>(),
      player: {
        pos: { x: 60, y: 60 },
        vel: { x: 0, y: 0 },
        speed: 180,
        size: 18,
      },
      tPrev: performance.now(),
    };

    function clamp(n: number, min: number, max: number) {
      return Math.min(max, Math.max(min, n));
    }

    const down = (e: KeyboardEvent) => world.keys.add(e.key.toLowerCase());
    const up = (e: KeyboardEvent) => world.keys.delete(e.key.toLowerCase());
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    function frame(tNow: number) {
      const dt = Math.min(0.033, (tNow - world.tPrev) / 1000);
      world.tPrev = tNow;
      update(dt);
      render();
      if (running) raf = requestAnimationFrame(frame);
    }

    function update(dt: number) {
      const { player, keys } = world;
      player.vel.x = 0;
      player.vel.y = 0;
      if (keys.has("arrowleft") || keys.has("a")) player.vel.x -= player.speed;
      if (keys.has("arrowright") || keys.has("d")) player.vel.x += player.speed;
      if (keys.has("arrowup") || keys.has("w")) player.vel.y -= player.speed;
      if (keys.has("arrowdown") || keys.has("s")) player.vel.y += player.speed;

      player.pos.x += player.vel.x * dt;
      player.pos.y += player.vel.y * dt;

      player.pos.x = clamp(player.pos.x, 0, world.size.w() - player.size);
      player.pos.y = clamp(player.pos.y, 0, world.size.h() - player.size);
    }

    function render() {
      const w = world.size.w();
      const h = world.size.h();
      ctx.clearRect(0, 0, w, h);

      // background grid
      ctx.globalAlpha = 0.2;
      for (let x = 0; x < w; x += 20) {
        ctx.fillRect(x, 0, 1, h);
      }
      for (let y = 0; y < h; y += 20) {
        ctx.fillRect(0, y, w, 1);
      }
      ctx.globalAlpha = 1;

      // player
      ctx.fillStyle = "#7dd3fc";
      ctx.fillRect(
        world.player.pos.x,
        world.player.pos.y,
        world.player.size,
        world.player.size
      );
      // HUD
      ctx.font =
        "16px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto";
      ctx.fillStyle = "#e5e7eb";
      ctx.fillText(message, 12, 24);
      ctx.fillStyle = "#94a3b8";
      ctx.fillText("Move: WASD / Arrow Keys", 12, h - 12);
    }

    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [message]);

  return (
    <div className="h-full grid place-items-center bg-[radial-gradient(circle_at_30%_20%,#171a22_0%,#0b0d12_60%)]">
      <div className="absolute inset-0 pointer-events-none p-2.5 flex justify-between text-sm opacity-90">
        <span>Sweet Hearts (Vite)</span>
        <span>v0.0.1</span>
      </div>
      <div className="relative w-[min(92vw,900px)] aspect-[16/9] rounded-2xl overflow-hidden outline outline-1 outline-[#2a2f3a] shadow-[0_10px_30px_rgba(0,0,0,0.35)] bg-[#0e1117]">
        <div className="relative w-full h-full">
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
      </div>
    </div>
  );
}
