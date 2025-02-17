export const getMousePoint = (event: React.MouseEvent<HTMLCanvasElement>) => {
  const { clientX, clientY } = event;
  return { clientX: clientX - 128, clientY: clientY - 48 };
};

export function moveToLast(arr: T[], i: number) {
  const item = arr.splice(i, 1)[0];
  arr.push(item);
  return arr;
}
