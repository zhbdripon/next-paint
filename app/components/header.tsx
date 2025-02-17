"use client";
import React from "react";
import useNextPaintStore from "../store";

const Header = () => {
  const selectedTool = useNextPaintStore((s) => s.selectedTool);
  const selectedShape = useNextPaintStore((s) => s.selectedShape);

  return (
    <div className="w-full h-16 border-2 bg-gray-100">
      <div>Selected Tool : {selectedTool}</div>
      {selectedShape && <div>Selected Shape : {selectedShape}</div>}
    </div>
  );
};

export default Header;
