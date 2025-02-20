"use client";
import { useEffect } from "react";
import { FaPencil } from "react-icons/fa6";
import { IoMdResize } from "react-icons/io";
import { MdOutlineRedo, MdOutlineUndo } from "react-icons/md";
import { RiDragMove2Line } from "react-icons/ri";
import useNextPaintStore from "../store";
import ActionButton from "./ActionButton";
import ToggleButton from "./ToggleButton";

const ActionBar = () => {
  const {
    elements,
    selectedTool,
    selectedShape,
    setSelectedTool,
    setSelectedShape,
    undo,
    redo,
    undoDisabled,
    redoDisabled,
  } = useNextPaintStore((s) => s);
  const noElements = elements.length === 0;

  useEffect(() => {
    if (noElements && selectedTool !== "draw" && selectedShape !== "circle") {
      setSelectedTool("draw");
      setSelectedShape("circle");
    }
  }, [noElements, selectedTool, selectedShape]);

  return (
    <div className="h-16 md:h-full w-full md:w-16 border-2 bg-gray-100 flex flex-row md:flex-col justify-start items-center">
      <ToggleButton
        tooltip="draw"
        value={selectedTool === "draw"}
        icon={FaPencil}
        onSwitchedOn={() => {
          setSelectedTool("draw");
          setSelectedShape("circle");
        }}
      />
      <ToggleButton
        tooltip="move"
        value={selectedTool === "move"}
        icon={RiDragMove2Line}
        disabled={noElements}
        onSwitchedOn={() => {
          setSelectedTool("move");
          setSelectedShape(null);
        }}
      />
      <ToggleButton
        tooltip="resize"
        disabled={noElements}
        value={selectedTool === "resize"}
        icon={IoMdResize}
        onSwitchedOn={() => {
          setSelectedTool("resize");
          setSelectedShape(null);
        }}
      />
      <ActionButton
        tooltip="undo"
        icon={MdOutlineUndo}
        onClick={undo}
        disabled={undoDisabled}
      />
      <ActionButton
        tooltip="redo"
        icon={MdOutlineRedo}
        onClick={redo}
        disabled={redoDisabled}
      />
    </div>
  );
};

export default ActionBar;
