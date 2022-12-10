import Point from '../objects/point';
import { matricesMultiplication, Matrix } from './matrix';

export type Rotation = {
  x: number;
  y: number;
  z: number;
};

export function rotateX(angle: number, matrix: Matrix) {
  const rotationMatrix = [
    [1, 0, 0],
    [0, Math.cos(angle), -Math.sin(angle)],
    [0, Math.sin(angle), Math.cos(angle)],
  ];
  return matricesMultiplication(rotationMatrix, matrix);
}

export function rotateY(angle: number, matrix: Matrix) {
  const rotationMatrix = [
    [Math.cos(angle), 0, Math.sin(angle)],
    [0, 1, 0],
    [-Math.sin(angle), 0, Math.cos(angle)],
  ];
  return matricesMultiplication(rotationMatrix, matrix);
}

export function rotateZ(angle: number, matrix: Matrix) {
  const rotationMatrix = [
    [Math.cos(angle), -Math.sin(angle), 0],
    [Math.sin(angle), Math.cos(angle), 0],
    [0, 0, 1],
  ];
  return matricesMultiplication(rotationMatrix, matrix);
}

export function rotate(m: Matrix, rotation: Rotation) {
  const { x: xRotation, y: yRotation, z: zRotation } = rotation;
  let matrix = rotateX(xRotation, m);
  matrix = rotateY(yRotation, matrix);
  matrix = rotateZ(zRotation, matrix);
  const [[x], [y], [z]] = matrix;
  return new Point(x, y, z);
}
