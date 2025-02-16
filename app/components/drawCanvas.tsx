"use client";
import { useLayoutEffect } from "react";
import useCanvasSize from "../hook/useWindowSize";

const DrawingCanvas = () => {
  const { width, height } = useCanvasSize();

  console.log(width, height);

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.beginPath();
      ctx.rect(20, 20, 150, 100);
      ctx.arc(95, 50, 40, 0, 2 * Math.PI);
      ctx.stroke();
    }
  });

  return (
    <div className="w-canvas">
      <canvas id="canvas" width={width} height={height}></canvas>
    </div>
  );
};

export default DrawingCanvas;
