import { useEffect, useState } from "react";
import {
  HEADER_SIZE,
  LARGE_SCREEN_MIN_WIDTH,
  SIDEBAR_SIZE,
} from "../constants";

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
      const isLargeScreen = window.innerWidth >= LARGE_SCREEN_MIN_WIDTH;

      setSize({
        width: window.innerWidth - (isLargeScreen ? SIDEBAR_SIZE : 0),
        height:
          window.innerHeight -
          (isLargeScreen ? HEADER_SIZE : HEADER_SIZE + SIDEBAR_SIZE),
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};

export default useCanvasSize;
