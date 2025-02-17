import { HEADER_SIZE, SIDEBAR_SIZE } from "./constants";

export const getMousePoint = (event: React.MouseEvent<HTMLCanvasElement>) => {
  const { clientX, clientY } = event;
  return { clientX: clientX - SIDEBAR_SIZE, clientY: clientY - HEADER_SIZE };
};

export const moveToLast = (arr: any[], i: number): any[] => {
  const item = arr.splice(i, 1)[0];
  arr.push(item);
  return arr;
};

export const getDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  return Math.sqrt(
    Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2)
  );
};
