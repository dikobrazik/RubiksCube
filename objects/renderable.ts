import { matricesMultiplication } from '../helpers/matrix';
import {
  rotate,
  rotateX,
  rotateY,
  rotateZ,
  Rotation,
} from '../helpers/rotation';
import Point from './point';

export type Position = {
  x: number;
  y: number;
  z: number;
};

export class RenderableObject {
  public rotation: Rotation = {
    x: 0,
    y: 0,
    z: 0,
  };

  public position: Position = {
    x: 0,
    y: 0,
    z: 0,
  };

  public getPositionMatrix() {
    return [[this.position.x], [this.position.y], [this.position.z]];
  }

  public rotateX(angle: number) {
    this.rotation.x += angle;
  }

  public rotateY(angle: number) {
    this.rotation.y += angle;
  }

  public rotateZ(angle: number) {
    this.rotation.z += angle;
  }

  public rotate(rotation: Rotation) {
    this.rotation.x += rotation.x;
    this.rotation.y += rotation.y;
    this.rotation.z += rotation.z;
  }

  public setPosition(x, y, z) {}

  public render(ctx: CanvasRenderingContext2D) {}
}
