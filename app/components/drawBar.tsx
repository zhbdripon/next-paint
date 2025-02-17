"use client";
import { FaRegCircle } from "react-icons/fa6";
import { LuRectangleHorizontal } from "react-icons/lu";
import useNextPaintStore from "../store";
import ToggleButton from "./ToggleButton";

const DrawBar = () => {
  const setSelectedShape = useNextPaintStore((s) => s.setSelectedShape);
  const setSelectedTool = useNextPaintStore((s) => s.setSelectedTool);
  const selectedShape = useNextPaintStore((s) => s.selectedShape);

  return (
    <div className="h-full w-16 border-2 bg-gray-100 flex flex-col justify-start items-center">
      <ToggleButton
        value={selectedShape === "circle"}
        icon={FaRegCircle}
        onSwitchedOn={() => {
          setSelectedShape("circle");
          setSelectedTool("draw");
        }}
      />
      <ToggleButton
        value={selectedShape === "rectangle"}
        icon={LuRectangleHorizontal}
        onSwitchedOn={() => {
          setSelectedShape("rectangle");
          setSelectedTool("draw");
        }}
      />
    </div>
  );
};

export default DrawBar;
