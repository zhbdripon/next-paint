"use client";
import { cloneDeep } from "lodash";
import { useLayoutEffect, useState } from "react";
import useCanvasSize from "../hook/useWindowSize";
import { Circle, Rectangle, Shape } from "../shapes";
import { getMousePoint, moveToLast } from "../utils";

const Actions = {
  draw: "draw",
  move: "move",
  resize: "resize",
};

type PaintAction = "draw" | "move" | "resize";
type Shapes = Circle["name"] | Rectangle["name"];

const ShapeClassMap = {
  [Circle["name"]]: Circle,
  [Rectangle["name"]]: Rectangle,
};

const DrawingCanvas = () => {
  const { width, height } = useCanvasSize();
  const [drawing, setDrawing] = useState<boolean>(false);
  const [elements, setElements] = useState<Shape[]>([]);
  const [currentElement, setCurrentElement] = useState<Shape | null>(null);
  const [activeTool, setActiveTool] = useState<PaintAction>("draw");
  const [activeShape, setActiveShape] = useState<Shapes>(Circle["name"]);

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

    switch (activeTool) {
      case Actions.draw:
        const ActiveShape = ShapeClassMap[activeShape];
        const element = new ActiveShape(clientX, clientY);
        setElements([...elements, element]);
        break;
      default:
        for (let i = elements.length - 1; i >= 0; i--) {
          const element = elements[i];
          if (element.isPointInsideShape(clientX, clientY)) {
            element.mouseStartX = clientX;
            element.mouseStartY = clientY;
            setCurrentElement(cloneDeep(element));
            setElements(moveToLast(elements, i));
            break;
          } else {
            setCurrentElement(null);
          }
        }
    }

  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    const lastIndex = elements.length - 1;
    const lastElement = elements[lastIndex] as Shape;

    switch (activeTool) {
      case Actions.draw:
        lastElement.handleMouseRelease(event);
        setCurrentElement(cloneDeep(lastElement));
        break;
      case Actions.move:
        if (currentElement) {
          lastElement.handleShapeMove(event);
          setCurrentElement(cloneDeep(lastElement));
        }
        break;
      case Actions.resize:
        if (currentElement) {
          lastElement.handleResize(event);
          setCurrentElement(cloneDeep(lastElement));
        }
    }
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setDrawing(false);

    // switch (activeTool) {
    //   case Actions.draw:
    //     const lastIndex = elements.length - 1;
    //     const lastElement = elements[lastIndex];
    //     lastElement.handleMouseRelease(event);
    //     break;
    //   case Actions.move:
    // }
  };

  return (
    <div className="w-canvas">
      <button onClick={() => setActiveTool("resize")}>move</button>
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
