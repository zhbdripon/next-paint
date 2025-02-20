"use client";
import { cloneDeep } from "lodash";
import { useLayoutEffect, useState } from "react";
import useCanvasSize from "../hook/useWindowSize";
import { PaintActions, Shape, ShapeClassMap } from "../shapes";
import useNextPaintStore from "../store";
import { getTouchOrMousePoint, moveToLast } from "../utils";

const DrawingCanvas = () => {
  const { width, height } = useCanvasSize();
  const [drawing, setDrawing] = useState<boolean>(false);
  const [currentElement, setCurrentElement] = useState<Shape | null>(null);
  const elements = useNextPaintStore((s) => s.elements);
  const setElements = useNextPaintStore((s) => s.setElements);
  const activeTool = useNextPaintStore((s) => s.selectedTool);
  const activeShape = useNextPaintStore((s) => s.selectedShape);
  const addToEditHistory = useNextPaintStore((s) => s.addToEditHistory);
  const editHistory = useNextPaintStore((s) => s.editHistory);

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, width, height);
    context.filter = "blur(5px)";
    context.fillStyle = "rgba(255, 255, 255, 0.3)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.filter = "none";

    elements.forEach((element) => {
      context.beginPath();
      element.draw(context);
      context.stroke();
    });

    if (currentElement) {
      currentElement.draw(context);
    }
  }, [elements, currentElement]);

  const handleMouseDown = (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
    setDrawing(true);

    const { clientX, clientY } = getTouchOrMousePoint(event);

    switch (activeTool) {
      case PaintActions.draw:
        const ActiveShape = ShapeClassMap[activeShape!];
        const element = new ActiveShape(clientX, clientY);
        setElements([...elements, element]);
        break;

      default:
        let foundElement = false;
        for (let i = elements.length - 1; i >= 0; i--) {
          const element = elements[i];
          if (element.isPointInsideShape(clientX, clientY)) {
            element.mouseStartX = clientX;
            element.mouseStartY = clientY;
            setCurrentElement(cloneDeep(element));
            setElements(moveToLast(elements, i));
            foundElement = true;
            break;
          }
        }

        if (!foundElement) {
          setCurrentElement(null);
        }
    }
  };

  const handleMouseMove = (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
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
    addToEditHistory(cloneDeep(elements));
  };

  return (
    <div className="w-full md:w-canvas">
      <canvas
        id="canvas"
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      ></canvas>
    </div>
  );
};

export default DrawingCanvas;
