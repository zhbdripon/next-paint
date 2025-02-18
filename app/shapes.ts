import { getDistance, getTouchOrMousePoint } from "./utils";
export abstract class Shape {
  abstract name: string;
  mouseStartX = 0;
  mouseStartY = 0;
  x = 0;
  y = 0;

  abstract handleMouseRelease(
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ): void;
  abstract handleResize(
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ): void;
  abstract isPointInsideShape(x: number, y: number): boolean;
  abstract draw(context: CanvasRenderingContext2D): void;

  handleShapeMove(
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) {
    const { clientX, clientY } = getTouchOrMousePoint(event);
    const diffX = clientX - this.mouseStartX;
    const diffY = clientY - this.mouseStartY;
    this.x += diffX;
    this.y += diffY;
    this.mouseStartX = clientX;
    this.mouseStartY = clientY;
  }

  _getStartAndEndPoints(
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) {
    const { clientX, clientY } = getTouchOrMousePoint(event);

    const startX = Math.min(this.mouseStartX, clientX);
    const endX = Math.max(this.mouseStartX, clientX);
    const startY = Math.min(this.mouseStartY, clientY);
    const endY = Math.max(this.mouseStartY, clientY);

    return { startX, startY, endX, endY };
  }
}

export class Rectangle extends Shape {
  name = "rectangle";
  w = 0;
  h = 0;

  constructor(public x: number, public y: number, w?: number, h?: number) {
    super();
    this.mouseStartX = x;
    this.mouseStartY = y;
    this.w = w || 0;
    this.h = h || 0;
  }

  override handleMouseRelease(
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) {
    const { startX, startY, endX, endY } = this._getStartAndEndPoints(event);

    this.x = startX;
    this.y = startY;
    this.w = endX - startX;
    this.h = endY - startY;
  }

  override draw(context: CanvasRenderingContext2D) {
    if (context) {
      context.rect(this.x, this.y, this.w, this.h);
    }
  }

  override isPointInsideShape(x: number, y: number) {
    return (
      x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h
    );
  }

  handleResize(
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) {
    const { clientX, clientY } = getTouchOrMousePoint(event);
    const diffX = clientX - this.mouseStartX;
    const diffY = clientY - this.mouseStartY;
    this.w += diffX;
    this.h += diffY;
    this.mouseStartX = clientX;
    this.mouseStartY = clientY;
  }
}

export class Circle extends Shape {
  name = "circle";
  r = 0;

  constructor(public x: number, public y: number, r?: number) {
    super();
    this.mouseStartX = x;
    this.mouseStartY = y;
    this.r = r || 0;
  }

  override handleMouseRelease(
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) {
    const { clientX, clientY } = getTouchOrMousePoint(event);
    this.r = getDistance(this.x, this.y, clientX, clientY);
  }

  override draw(context: CanvasRenderingContext2D) {
    if (context) {
      context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    }
  }

  override isPointInsideShape(x: number, y: number) {
    const distanceSquared = (x - this.x) ** 2 + (y - this.y) ** 2;
    return distanceSquared <= this.r ** 2;
  }

  handleResize(
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) {
    const { clientX, clientY } = getTouchOrMousePoint(event);

    const initialDistance = getDistance(
      this.x,
      this.y,
      this.mouseStartX,
      this.mouseStartY
    );
    const finalDistance = getDistance(this.x, this.y, clientX, clientY);
    const delta = finalDistance - initialDistance;

    this.r = Math.max(0, this.r + delta);
    this.mouseStartX = clientX;
    this.mouseStartY = clientY;
  }
}

export type PaintAction = "draw" | "move" | "resize";
export const PaintActions: Record<string, PaintAction> = {
  draw: "draw",
  move: "move",
  resize: "resize",
} as const;

export type PaintShape = "circle" | "rectangle";
export const PaintShapes: Record<string, PaintShape> = {
  circle: "circle",
  rectangle: "rectangle",
} as const;

export type ShapeConstructor = new (x: number, y: number) => Shape;
export const ShapeClassMap: Record<string, ShapeConstructor> = {
  circle: Circle,
  rectangle: Rectangle,
};
