"use client";
import { FaPencil } from "react-icons/fa6";
import { IoMdResize } from "react-icons/io";
import { MdOutlineRedo, MdOutlineUndo } from "react-icons/md";
import { RiDragMove2Line } from "react-icons/ri";
import useNextPaintStore from "../store";
import ToggleButton from "./ToggleButton";
import ActionButton from "./ActionButton";

const ActionBar = () => {
  const setSelectedTool = useNextPaintStore((s) => s.setSelectedTool);
  const setSelectedShape = useNextPaintStore((s) => s.setSelectedShape);
  const selectedTool = useNextPaintStore((s) => s.selectedTool);
  const undo = useNextPaintStore((s) => s.undo);
  const redo = useNextPaintStore((s) => s.redo);
  const undoDisabled = useNextPaintStore((s) => s.undoDisabled);
  const redoDisabled = useNextPaintStore((s) => s.redoDisabled);

  return (
    <div className="h-16 md:h-full w-full md:w-16 border-2 bg-gray-100 flex flex-row md:flex-col justify-start items-center">
      <ToggleButton
        value={selectedTool === "draw"}
        icon={FaPencil}
        onSwitchedOn={() => {
          setSelectedTool("draw");
        }}
      />
      <ToggleButton
        value={selectedTool === "move"}
        icon={RiDragMove2Line}
        onSwitchedOn={() => {
          setSelectedTool("move");
          setSelectedShape(null);
        }}
      />
      <ToggleButton
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
