import { useState, useEffect } from "react";

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
        width: window.innerWidth - 48,
        height: window.innerHeight - 128,
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};

export default useCanvasSize;
