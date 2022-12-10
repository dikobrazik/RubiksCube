import { lineToPoint, moveToPoint } from '../canvas';
import { rotate } from '../helpers/rotation';
import Point from './point';
import { RenderableObject } from './renderable';

class Vector extends RenderableObject {
  constructor(
    private start: Point,
    private end: Point,
    private color = 'black'
  ) {
    super();
  }

  public getStartPoint() {
    return rotate(this.start.getCoordinatesMatrix(), this.rotation);
  }

  public getEndPoint() {
    return rotate(this.end.getCoordinatesMatrix(), this.rotation);
  }

  public add(vector: Vector) {
    return new Vector(this.start.clone(), vector.end.clone());
  }

  public mult(scale: number) {
    return new Vector(this.start.clone(), this.end.mult(scale));
  }

  public div(scale: number) {
    return new Vector(this.start.clone(), this.end.div(scale));
  }

  public normalize() {
    return new Vector(this.start.clone(), this.end.div(this.length));
  }

  public mod() {
    const x = this.end.getCoordinates().x - this.start.getCoordinates().x;
    const y = this.end.getCoordinates().y - this.start.getCoordinates().y;
    const z = this.end.getCoordinates().z - this.start.getCoordinates().z;

    return new Vector(new Point(0, 0, 0), new Point(x, y, z));
  }

  public getRotation() {
    const { x, y } = this.mod().getEndPoint().getCoordinates();

    return Math.atan2(y, x);
  }

  public invert() {
    return new Vector(this.end, this.start);
  }

  public get length() {
    const { x, y, z } = this.getStartPoint()
      .mod()
      .add(this.getEndPoint().mod())
      .getCoordinates();

    return Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  }

  public drawVector(ctx: CanvasRenderingContext2D) {
    moveToPoint(ctx, this.getStartPoint());
    lineToPoint(ctx, this.getEndPoint());
    this.drawVectorDirection(ctx);
  }

  public render(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    this.drawVector(ctx);
    ctx.stroke();
  }

  private drawVectorDirection(ctx: CanvasRenderingContext2D) {
    const directionLength = 10;
    const { x, y, z } = this.getEndPoint().getCoordinates();

    const leftRotation = this.invert().getRotation() - Math.PI * 0.1;
    const rightRotation = this.invert().getRotation() + Math.PI * 0.1;

    moveToPoint(ctx, this.getEndPoint());
    lineToPoint(
      ctx,
      new Point(
        x + Math.cos(leftRotation) * directionLength,
        y + Math.sin(leftRotation) * directionLength,
        0
      )
    );

    moveToPoint(ctx, this.getEndPoint());
    lineToPoint(
      ctx,
      new Point(
        x + Math.cos(rightRotation) * directionLength,
        y + Math.sin(rightRotation) * directionLength,
        0
      )
    );
  }
}

export default Vector;
