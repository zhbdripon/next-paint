"use client";
import { Button } from "@radix-ui/themes";
import { Shape, ShapeClassMap } from "../shapes";
import useNextPaintStore from "../store";

const Header = () => {
  const selectedTool = useNextPaintStore((s) => s.selectedTool);
  const selectedShape = useNextPaintStore((s) => s.selectedShape);
  const elements = useNextPaintStore((s) => s.elements);
  const setElements = useNextPaintStore((s) => s.setElements);

  const handleSaveToLocalStorage = () => {
    localStorage.setItem("elements", JSON.stringify(elements));
  };

  const handleLoadFromLocalStorage = () => {
    const elementsFromStorage = localStorage.getItem("elements");
    const constructedElements: Shape[] = [];

    if (elementsFromStorage) {
      const elementsData = JSON.parse(elementsFromStorage);
      elementsData.forEach((element: Shape) => {
        const ShapeClass = ShapeClassMap[element.name];
        const shapeInstance = new ShapeClass(element.x, element.y);
        Object.assign(shapeInstance, element);
        constructedElements.push(shapeInstance);
      });

      setElements(constructedElements);
    }
  };

  const handlePaintDownload = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) return;

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "canvas-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full h-16 border-2 bg-gray-100 flex justify-between">
      <div>
        <div>Tool : {selectedTool}</div>
        {selectedShape && <div>Shape : {selectedShape}</div>}
      </div>
      <div className="[&>button]:m-1">
        {elements.length > 0 && (
          <Button onClick={handlePaintDownload}>Download</Button>
        )}
        <Button onClick={handleLoadFromLocalStorage}>Load</Button>
        <Button onClick={handleSaveToLocalStorage}>Save</Button>
      </div>
    </div>
  );
};

export default Header;
