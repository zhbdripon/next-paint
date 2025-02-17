import { create } from "zustand";

export interface PaintStore {
  selectedShape: string;
  selectedTool: string;

  setSelectedShape: (shape: string) => void;
  setSelectedTool: (tool: string) => void;
}

const useNextPaintStore = create<PaintStore>((set) => ({
  selectedShape: "circle",
  selectedTool: "draw",
  setSelectedShape: (shape: string) => set({ selectedShape: shape }),
  setSelectedTool: (tool: string) => set({ selectedTool: tool }),
}));

export default useNextPaintStore;
