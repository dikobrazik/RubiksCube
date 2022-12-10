import Point from './objects/point';

export function moveToPoint(ctx: CanvasRenderingContext2D, point: Point) {
  const { x, y, z } = point.getCoordinates();
  ctx.moveTo(x, y);
}

export function lineToPoint(ctx: CanvasRenderingContext2D, point: Point) {
  const { x, y, z } = point.getCoordinates();
  ctx.lineTo(x, y);
}
