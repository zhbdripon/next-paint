import { useState, useEffect } from "react";
import { HEADER_SIZE, SIDEBAR_SIZE } from "../constants";

interface CanvasSize {
  width: number;
  height: number;
}

const useCanvasSize = (): CanvasSize => {
  const [size, setSize] = useState<CanvasSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateSize = () => {
      setSize({
        width: window.innerWidth - SIDEBAR_SIZE,
        height: window.innerHeight - HEADER_SIZE,
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};

export default useCanvasSize;
