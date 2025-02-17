"use client";
import { cloneDeep } from "lodash";
import { useLayoutEffect, useState } from "react";
import useCanvasSize from "../hook/useWindowSize";
import { PaintActions, Shape, ShapeClassMap } from "../shapes";
import useNextPaintStore from "../store";
import { getMousePoint, moveToLast } from "../utils";

const DrawingCanvas = () => {
  const { width, height } = useCanvasSize();
  const [drawing, setDrawing] = useState<boolean>(false);
  const [currentElement, setCurrentElement] = useState<Shape | null>(null);
  const elements = useNextPaintStore((s) => s.elements);
  const setElements = useNextPaintStore((s) => s.setElements);
  const activeTool = useNextPaintStore((s) => s.selectedTool);
  const activeShape = useNextPaintStore((s) => s.selectedShape);

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
      case PaintActions.draw:
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
      case PaintActions.draw:
        lastElement.handleMouseRelease(event);
        break;

      case PaintActions.move:
        if (currentElement) {
          lastElement.handleShapeMove(event);
        }
        break;

      case PaintActions.resize:
        if (currentElement) {
          lastElement.handleResize(event);
        }
    }

    setCurrentElement(cloneDeep(lastElement));
  };

  const handleMouseUp = () => {
    setDrawing(false);
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
