import { matricesMultiplication } from './helpers/matrix';

class Camera {
  constructor(
    private left: number,
    private right: number,
    private top: number,
    private bottom: number,
    private near: number,
    private far: number
  ) {}

  public clip(matrix: number[][]) {
    const ortoprahicProjectionMatrix = [
      [
        2 / (this.right - this.left),
        0,
        0,
        -((this.right + this.left) / (this.right - this.left)),
      ],
      [
        0,
        2 / (this.top - this.bottom),
        0,
        -((this.top + this.bottom) / (this.top - this.bottom)),
      ],
      [
        0,
        0,
        -2 / (this.far - this.near),
        -((this.far + this.near) / (this.far - this.near)),
      ],
      [0, 0, 0, 1],
    ];

    matricesMultiplication(ortoprahicProjectionMatrix, matrix);
  }
}

export default Camera;
