import Cube, { FACE, FACE_VALUES } from './objects/cube';
import { RenderableObject } from './objects/renderable';

const cubesPositions = [
  // back layer
  // upper
  -100, 100, -100, 0, 100, -100, 100, 100, -100,
  // center
  -100, 0, -100, 0, 0, -100, 100, 0, -100,
  // down
  -100, -100, -100, 0, -100, -100, 100, -100, -100,
  // center layer
  // upper
  -100, 100, 0, 0, 100, 0, 100, 100, 0,
  // center
  -100, 0, 0, 0, 0, 0, 100, 0, 0,
  // down
  -100, -100, 0, 0, -100, 0, 100, -100, 0,
  // front layer
  // upper
  -100, 100, 100, 0, 100, 100, 100, 100, 100,
  // center
  -100, 0, 100, 0, 0, 100, 100, 0, 100,
  // down
  -100, -100, 100, 0, -100, 100, 100, -100, 100,
];

class RubiksCube extends RenderableObject {
  private cubes: Cube[];

  private facesCubes: Record<FACE_VALUES, Cube[]> = {
    [FACE.BACK]: [],
    [FACE.FRONT]: [],
    [FACE.LEFT]: [],
    [FACE.RIGHT]: [],
    [FACE.BOTTOM]: [],
    [FACE.TOP]: [],
  };

  constructor() {
    super();

    this.initialize();

    this.subscribeKeyboard();
  }

  private initialize() {
    this.cubes = Array(27)
      .fill(undefined)
      .map(() => new Cube(100, 'orange'));
    for (let index = 0; index <= cubesPositions.length - 3; index += 3) {
      let cubePositionIndex = index / 3;
      const cube = this.cubes[cubePositionIndex];
      const [x, y, z] = cubesPositions.slice(index, index + 3);
      cube.position.x = x;
      cube.position.y = y;
      cube.position.z = z;

      this.addCubeToFaces(cube, cubePositionIndex);
      this.fillCubeFaces(cube, cubePositionIndex);

      cube.rotateY(Math.PI * -0.1);
      cube.rotateX(Math.PI * -0.1);
    }
  }

  private subscribeKeyboard() {
    window.addEventListener('keydown', (event) => {
      event.preventDefault();
      switch (event.code) {
        case 'ArrowRight':
          return this.rotateRightFace(event.shiftKey);
        case 'ArrowUp':
          return this.rotateTopFace(event.shiftKey);
        // case 'ArrowUp':
        //   return this.rotateFace(event.shiftKey);
        // case 'ArrowDown':
        //   return this.rotateFace(event.shiftKey);
      }
    });
  }

  public render(ctx: CanvasRenderingContext2D) {
    this.cubes.forEach((cube) => cube.render(ctx));
  }

  private rotateRightFace(clockwise: boolean) {
    const faceCubes = this.facesCubes[FACE.RIGHT];
    let start = 0,
      targetRotation = (clockwise ? -1 : 1) * (Math.PI / 2);
    const delta = (Math.PI * (clockwise ? -1 : 1)) / 180;

    for (const cube of faceCubes) {
      cube.setVerticesRenderOrder([
        FACE.TOP,
        FACE.RIGHT,
        FACE.BOTTOM,
        FACE.FRONT,
      ]);
    }

    const rotate = () => {
      for (const cube of faceCubes) {
        cube.rotateX(delta);
      }
      start += delta;
      if (clockwise) {
        if (start > targetRotation) {
          window.requestAnimationFrame(rotate);
        }
      } else {
        if (start < targetRotation) {
          window.requestAnimationFrame(rotate);
        }
      }
    };
    window.requestAnimationFrame(rotate);
  }

  private rotateTopFace(clockwise: boolean) {
    const faceCubes = this.facesCubes[FACE.TOP];
    let start = 0,
      targetRotation = Math.PI / 2;

    const rotate = () => {
      for (const cube of faceCubes) {
        cube.rotateY(Math.PI / 180);
      }
      start += Math.PI / 180;
      if (start < targetRotation) {
        window.requestAnimationFrame(rotate);
      }
    };
    window.requestAnimationFrame(rotate);
  }

  private addCubeToFaces(cube: Cube, index: number) {
    for (const face of this.getCubeFacesByIndex(index)) {
      this.facesCubes[face].push(cube);
    }
  }

  private fillCubeFaces(cube: Cube, index: number) {
    for (const face of this.getCubeFacesByIndex(index)) {
      switch (face) {
        case FACE.BACK:
          cube.verticesColors[FACE.BACK] = 'green';
          break;
        case FACE.FRONT:
          cube.verticesColors[FACE.FRONT] = 'red';
          break;
        case FACE.LEFT:
          cube.verticesColors[FACE.LEFT] = 'orange';
          break;
        case FACE.RIGHT:
          cube.verticesColors[FACE.RIGHT] = 'yellow';
          break;
        case FACE.BOTTOM:
          cube.verticesColors[FACE.BOTTOM] = 'purple';
          break;
        case FACE.TOP:
          cube.verticesColors[FACE.TOP] = 'blue';
          break;
      }
    }
  }

  private getCubeFacesByIndex(index: number) {
    const faces = [];
    if (index < 9) {
      faces.push(FACE.BACK);
    }
    if (index > 17) {
      faces.push(FACE.FRONT);
    }
    if (index % 3 === 0) {
      faces.push(FACE.LEFT);
    }
    if (index % 3 === 2) {
      faces.push(FACE.RIGHT);
    }
    if (index % 9 < 3) {
      faces.push(FACE.BOTTOM);
    }
    if (index % 9 > 5) {
      faces.push(FACE.TOP);
    }
    return faces;
  }
}

export default RubiksCube;
