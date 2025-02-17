import { create } from "zustand";

import {
  PaintAction,
  PaintActions,
  PaintShape,
  PaintShapes,
  Shape,
} from "./shapes";

export interface PaintStore {
  elements: Shape[];
  selectedShape: string;
  selectedTool: string;

  setSelectedShape: (shape: PaintShape) => void;
  setSelectedTool: (tool: PaintAction) => void;
  setElements: (elements: Shape[]) => void;
}

const useNextPaintStore = create<PaintStore>((set) => ({
  elements: [],
  selectedShape: PaintShapes.circle,
  selectedTool: PaintActions.draw,
  setSelectedShape: (shape: string) => set({ selectedShape: shape }),
  setSelectedTool: (tool: string) => set({ selectedTool: tool }),
  setElements: (elements: Shape[]) => set({ elements }),
}));

export default useNextPaintStore;
