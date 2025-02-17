import { getMousePoint } from "./utils";

export abstract class Shape {
  abstract readonly name: string;
  abstract mouseStartX: number;
  abstract mouseStartY: number;
  x = 0;
  y = 0;

  abstract handleMouseRelease(event: React.MouseEvent<HTMLCanvasElement>): void;
  abstract isPointInsideShape(x: number, y: number): boolean;
  abstract draw(context: CanvasRenderingContext2D): void;

  handleShapeMove(event: React.MouseEvent<HTMLCanvasElement>) {
    const { clientX, clientY } = getMousePoint(event);
    const diffX = clientX - this.mouseStartX;
    const diffY = clientY - this.mouseStartY;
    this.x += diffX;
    this.y += diffY;
    this.mouseStartX = clientX;
    this.mouseStartY = clientY;
  }
}

export class Rectangle extends Shape {
  name = "rectangle";
  w = 0;
  h = 0;

  constructor(
    public mouseStartX: number,
    public mouseStartY: number,
  ) {
    super();
    this.x = mouseStartX;
    this.y = mouseStartY;
  }

  override handleMouseRelease(event: React.MouseEvent<HTMLCanvasElement>) {
    const { clientX, clientY } = getMousePoint(event);

    const startX = Math.min(this.mouseStartX, clientX);
    const endX = Math.max(this.mouseStartX, clientX);
    const startY = Math.min(this.mouseStartY, clientY);
    const endY = Math.max(this.mouseStartY, clientY);

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
}

export class Circle extends Shape {
  name = "circle";
  r = 0;
  
  constructor(public mouseStartX: number, public mouseStartY: number) {
    super();
    this.x = mouseStartX;
    this.y = mouseStartY;
  }

  override handleMouseRelease(event: React.MouseEvent<HTMLCanvasElement>) {
    const { clientX, clientY } = getMousePoint(event);
    this.r = Math.sqrt(
      Math.pow(Math.abs(this.x - clientX), 2) +
        Math.pow(Math.abs(this.y - clientY), 2)
    );
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
}
