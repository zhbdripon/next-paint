import { HEADER_SIZE, LARGE_SCREEN_MIN_WIDTH, SIDEBAR_SIZE } from "./constants";

export const getTouchOrMousePoint = (
  event:
    | React.MouseEvent<HTMLCanvasElement>
    | React.TouchEvent<HTMLCanvasElement>
) => {
  let clientX, clientY;

  if ("touches" in event) {
    const touch = event.touches[0];
    clientX = touch.clientX;
    clientY = touch.clientY;
  } else {
    clientX = event.clientX;
    clientY = event.clientY;
  }

  const isLargeScreen = window.innerWidth >= LARGE_SCREEN_MIN_WIDTH;
  const xPos = clientX - (isLargeScreen ? SIDEBAR_SIZE : 0);
  const yPos =
    clientY - (isLargeScreen ? HEADER_SIZE : HEADER_SIZE + SIDEBAR_SIZE);

  return { clientX: xPos, clientY: yPos };
};

export const moveToLast = <T>(arr: T[], i: number): T[] => {
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
