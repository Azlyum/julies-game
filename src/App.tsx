import { useEffect, useRef, useState } from "react";
import "./index.css";
import { computeDPR, fitCanvas, attachResize } from "./game/utils/resize";
import { attachKeyboard } from "./game/utils/input";
import { createWorld } from "./game/core/world";
import { update } from "./game/core/update";
import { render } from "./game/core/render";
import Card from "./component/card";
import { startLoop } from "./game/core/loop";

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameIdle, setGameIdle] = useState(true);
  const [spawningActive, setSpawningActive] = useState(true);
  const [runId, setRunId] = useState(0); // to force re-render on restart
  const CreateWorldRef = useRef(createWorld).current;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const worldRef = useRef<any>(null);
  const [playerScore, setPlayerScore] = useState(0);

  useEffect(() => {
    let frame: number;

    function tick() {
      const world = worldRef.current;
      if (world) {
        setPlayerScore(Math.floor(world.score));
      }
      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const dpr = computeDPR();
    fitCanvas(canvas, ctx, dpr);

    const world = CreateWorldRef(canvas, ctx, dpr);
    worldRef.current = world;
    world.idle = gameIdle;
    world.running = !gameIdle;
    world.spawningActive = !gameIdle;
    world.onGameOver = () => setGameOver(true);

    const detachResize = attachResize(canvas, ctx, () => computeDPR());
    const detachKeyboard = attachKeyboard(world.keys);
    const stop = startLoop(world, update, render);

    return () => {
      stop();
      detachResize();
      detachKeyboard();
    };
  }, [CreateWorldRef, gameIdle, runId]);

  return (
    <div className="h-full grid place-items-center bg-[radial-gradient(circle_at_30%_20%,#171a22_0%,#0b0d12_60%)]">
      <div>
        Player Score {playerScore}
        <div className="relative w-[min(92vw,900px)] aspect-[16/9] rounded-2xl overflow-hidden outline outline-1 outline-[#2a2f3a] shadow-[0_10px_30px_rgba(0,0,0,0.35)] bg-[#0e1117]">
          <div className="relative w-full h-full">
            <canvas ref={canvasRef} className="w-full h-full block" />
          </div>
          {gameIdle && spawningActive && (
            <Card
              title={"Wiener Run"}
              message={"For Julie ❤️."}
              onButtonClick={() => {
                setGameIdle(false);
                setSpawningActive(true);
                console.log("Starting game...", runId);
              }}
              buttonText="Start"
            />
          )}
          {gameOver && (
            <Card
              title={"Game Over!"}
              message={`Thanks for playing! ${playerScore} points scored.`}
              onButtonClick={() => {
                setRunId((prev) => prev + 1);
                setGameOver(false);
                setSpawningActive(true);
                console.log("Restarting game...", runId);
              }}
              buttonText="Restart"
            />
          )}
        </div>
      </div>
    </div>
  );
}
