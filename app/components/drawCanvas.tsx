"use client";
import { useLayoutEffect, useState } from "react";
import useCanvasSize from "../hook/useWindowSize";
import { cloneDeep } from "lodash";

const getMousePoint = (event: React.MouseEvent<HTMLCanvasElement>) => {
  const { clientX, clientY } = event;
  return { clientX: clientX - 128, clientY: clientY - 48 };
};

interface Shape {
  x: number;
  y: number;
  handleMouseRelease: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  draw: (context: CanvasRenderingContext2D) => void;
}

class Rectangle implements Shape {
  constructor(
    public x: number,
    public y: number,
    public w: number = 0,
    public h: number = 0
  ) {}

  handleMouseRelease(event: React.MouseEvent<HTMLCanvasElement>) {
    const { clientX, clientY } = getMousePoint(event);

    const startX = Math.min(this.x, clientX);
    const endX = Math.max(this.x, clientX);
    const startY = Math.min(this.y, clientY);
    const endY = Math.max(this.y, clientY);

    this.x = startX;
    this.y = startY;
    this.w = endX - startX;
    this.h = endY - startY;
  }

  draw(context: CanvasRenderingContext2D) {
    if (context) {
      context.rect(this.x, this.y, this.w, this.h);
    }
  }
}

class Circle implements Shape {
  constructor(public x: number, public y: number, public r: number = 0) {}

  handleMouseRelease(event: React.MouseEvent<HTMLCanvasElement>) {
    const { clientX, clientY } = getMousePoint(event);
    this.r = Math.sqrt(
      Math.pow(Math.abs(this.x - clientX), 2) +
        Math.pow(Math.abs(this.y - clientY), 2)
    );
  }

  draw(context: CanvasRenderingContext2D) {
    if (context) {
      context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    }
  }
}

const DrawingCanvas = () => {
  const { width, height } = useCanvasSize();
  const [drawing, setDrawing] = useState<boolean>(false);
  const [elements, setElements] = useState<Shape[]>([]);
  const [currentElement, setCurrentElement] = useState<Shape | null>(null);

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, width, height);
    elements.forEach((element) => {
      context.beginPath();
      element.draw(context);
      context.stroke();
    });

    if (currentElement) {
      currentElement.draw(context);
    }
  }, [elements, currentElement]);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setDrawing(true);

    const { clientX, clientY } = getMousePoint(event);

    const selectedShape = Rectangle;

    const element = new selectedShape(clientX, clientY);

    console.log("elements : ", elements);

    setElements([...elements, element]);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) {
      return;
    }
    const lastIndex = elements.length - 1;
    const lastElement = elements[lastIndex];
    lastElement.handleMouseRelease(event);
    setCurrentElement(cloneDeep(lastElement));
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setDrawing(false);
    const lastIndex = elements.length - 1;
    const lastElement = elements[lastIndex];
    lastElement.handleMouseRelease(event);
  };

  return (
    <div className="w-canvas">
      <canvas
        id="canvas"
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
    </div>
  );
};

export default DrawingCanvas;
