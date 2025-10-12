// -----------------------------------------------------------
// App.tsx — Core game loop for "For Julie ❤️"
//
// Pseudocode Summary:
// 1. Mount a <canvas> and get its 2D drawing context.
// 2. Keep a "world" object holding player position, keys pressed, and timing.
// 3. Start an animation loop: update positions, render visuals, repeat.
// 4. Use React only for mounting/unmounting, not frame updates.
//
// This file demonstrates how to mix React (UI lifecycle)
// with a traditional game loop inside a <canvas>.
// -----------------------------------------------------------

import React, { useEffect, useRef, useState } from "react";
import "./App.css";

export default function App() {
  // --- Create canvas reference and state
  // useRef gives us a handle to the <canvas> so we can draw directly on it.
  // useState holds a simple message that we can render on the canvas.

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [message] = useState("For Julie ❤️"); // change/cycle messages later

  // --- Effect: runs once on mount
  // This sets up our drawing context, input listeners, and the animation loop.
  // We use requestAnimationFrame for smooth timing and cleanup listeners on unmount.

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let running = true;

    const DPR = Math.max(1, Math.floor(window.devicePixelRatio || 1));

    // --- Function: fitCanvas()
    // Makes the canvas match the displayed CSS size * devicePixelRatio.
    // This keeps drawings sharp on high-DPI screens (like Retina or 4K laptops).
    function fitCanvas() {
      // CSS size stays responsive via wrapper; we map to device pixels
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * DPR);
      canvas.height = Math.floor(rect.height * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    fitCanvas();
    const onResize = () => fitCanvas();
    window.addEventListener("resize", onResize);

    // --- Simple state
    // --- Game state container ("world")
    // Holds canvas dimensions, pressed keys, player info, and last frame time.
    // Think of this like a mini-engine object we can mutate each frame.
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
    // --- Utility: clamp()
    // Ensures values (like player position) stay within bounds.

    function clamp(n: number, min: number, max: number) {
      return Math.min(max, Math.max(min, n));
    }

    // --- Input Handling
    // Listen for key presses/releases and record them in a Set.
    // Using a Set lets us track multiple keys at once (diagonal movement, etc.).

    const down = (e: KeyboardEvent) => world.keys.add(e.key.toLowerCase());
    const up = (e: KeyboardEvent) => world.keys.delete(e.key.toLowerCase());
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    // --- Loop
    // --- Main Animation Loop (frame)
    // Runs roughly 60 times per second.
    // 1. Compute delta time (time since last frame).
    // 2. Update world state based on input and physics.
    // 3. Render everything to the canvas.
    // 4. Request the next frame for continuous motion.

    function frame(tNow: number) {
      const dt = Math.min(0.033, (tNow - world.tPrev) / 1000); // cap delta (~30ms)
      world.tPrev = tNow;
      update(dt);
      render();
      if (running) raf = requestAnimationFrame(frame);
    }

    // --- Function: update(dt)
    // Adjusts player velocity and position based on keys pressed.
    // Applies delta time so movement speed stays consistent across frame rates.
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

      // keep inside bounds
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

      // simple title
      ctx.font =
        "16px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto";
      ctx.fillStyle = "#e5e7eb";
      ctx.fillText(message, 12, 24);
      ctx.fillStyle = "#94a3b8";
      ctx.fillText("Move: WASD / Arrow Keys", 12, h - 12);
    }

    raf = requestAnimationFrame(frame);

    // --- Cleanup on Unmount
    // Stop animation loop and remove listeners to avoid memory leaks.
    // This runs when React unmounts the component.
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [message]);

  return (
    <div className="app">
      <div className="canvas-wrap">
        <canvas ref={canvasRef} />
        <div className="hud">
          <span>Sweet Hearts (Vite)</span>
          <span>v0.0.1</span>
        </div>
      </div>
    </div>
  );
}
