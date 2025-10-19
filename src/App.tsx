import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { computeDPR, fitCanvas, attachResize } from "./game/resize";
import { attachKeyboard } from "./game/input";
import { createWorld } from "./game/world";
import { startLoop } from "./game/loop";
import { update } from "./game/update";
import { render } from "./game/render";
import Card from "./component/card";

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [runId, setRunId] = useState(0); // to force re-render on restart

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const dpr = computeDPR();
    fitCanvas(canvas, ctx, dpr);

    const world = createWorld(canvas, ctx, dpr);
    world.onGameOver = () => setGameOver(true);

    const detachResize = attachResize(canvas, ctx, () => computeDPR());
    const detachKeyboard = attachKeyboard(world.keys);
    const stop = startLoop(world, update, render);

    return () => {
      stop();
      detachResize();
      detachKeyboard();
    };
  }, [runId]);

  return (
    <div className="h-full grid place-items-center bg-[radial-gradient(circle_at_30%_20%,#171a22_0%,#0b0d12_60%)]">
      <div className="relative w-[min(92vw,900px)] aspect-[16/9] rounded-2xl overflow-hidden outline outline-1 outline-[#2a2f3a] shadow-[0_10px_30px_rgba(0,0,0,0.35)] bg-[#0e1117]">
        <div className="relative w-full h-full">
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
        {gameOver && (
          <Card
            title={"Game Over!"}
            message={"Thanks for playing!"}
            onRestart={() => {
              setRunId((prev) => prev + 1);
              setGameOver(false);
              console.log("Restarting game...", runId);
            }}
            buttonText="Restart"
          />
        )}
      </div>
    </div>
  );
}
