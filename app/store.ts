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
  selectedShape: PaintShape | null;
  selectedTool: PaintAction;
  editHistory: Shape[][];
  historyIndex: number;
  undoDisabled: boolean;
  redoDisabled: boolean;

  setSelectedShape: (shape: PaintShape | null) => void;
  setSelectedTool: (tool: PaintAction) => void;
  setElements: (elements: Shape[]) => void;
  addToEditHistory: (elements: Shape[]) => void;
  undo: () => void;
  redo: () => void;
}

const useNextPaintStore = create<PaintStore>((set) => ({
  elements: [],
  selectedShape: PaintShapes.circle,
  selectedTool: PaintActions.draw,
  editHistory: [],
  historyIndex: -1,
  undoDisabled: true,
  redoDisabled: true,

  setSelectedShape: (shape: PaintShape | null) => set({ selectedShape: shape }),
  setSelectedTool: (tool: PaintAction) => set({ selectedTool: tool }),
  setElements: (elements: Shape[]) => set({ elements }),

  addToEditHistory: (elements: Shape[]) =>
    set((state) => {
      let { editHistory } = state;
      const { historyIndex } = state;

      if (historyIndex + 1 === editHistory.length) {
        editHistory = [...editHistory, elements];
      } else if (historyIndex < editHistory.length - 1) {
        editHistory = [...editHistory.slice(0, historyIndex + 1), elements];
      }

      return { editHistory, historyIndex: editHistory.length - 1, undoDisabled: false, redoDisabled:true };
    }),

  undo: () =>
    set((state: PaintStore) => {
      const editHistory = state.editHistory;
      let historyIndex = state.historyIndex;
      let elements = state.elements;

      if (historyIndex >= 0) {
        historyIndex -= 1;
        elements = historyIndex >= 0 ? editHistory[historyIndex] : [];
      }
      return {
        elements,
        historyIndex,
        undoDisabled: historyIndex < 0,
        redoDisabled: false
      };
    }),

  redo: () =>
    set((state: PaintStore) => {
      let elements = state.elements;
      const editHistory = state.editHistory;
      let historyIndex = state.historyIndex;

      if (historyIndex < editHistory.length - 1) {
        historyIndex += 1;
        elements = editHistory[historyIndex];
      }
      return {
        elements,
        historyIndex,
        undoDisabled: false,
        redoDisabled: historyIndex + 1 === editHistory.length
      };
    }),
}));

export default useNextPaintStore;
