import { RenderableObject } from './renderable';

class Point implements RenderableObject {
  constructor(
    private x: number,
    private y: number,
    private z: number,
    private color = 'black'
  ) {}

  public rotation = {
    x: 0,
    y: 0,
    z: 0,
  };

  public getCoordinates() {
    return {
      x: this.x,
      y: this.y,
      z: this.z,
    };
  }

  public getCoordinatesMatrix() {
    return [[this.x], [this.y], [this.z]];
  }

  public add(point: Point) {
    const { x, y, z } = point.getCoordinates();
    return new Point(this.x + x, this.y + y, this.z + z);
  }

  public sub(point: Point) {
    const { x, y, z } = point.getCoordinates();
    return new Point(this.x - x, this.y - y, this.z - z);
  }

  public mult(scale: number) {
    return new Point(this.x / scale, this.y / scale, this.z / scale);
  }

  public mod() {
    return new Point(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
  }

  public div(scale: number) {
    return new Point(this.x / scale, this.y / scale, this.z / scale);
  }

  public clone() {
    return new Point(this.x, this.y, this.z);
  }

  public render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 1, 1);
  }
}

export default Point;
