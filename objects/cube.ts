import { lineToPoint, moveToPoint } from '../canvas';
import { rotate } from '../helpers/rotation';
import { RenderableObject } from './renderable';

type FaceVertices = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

export const FACE = {
  FRONT: 'front',
  BACK: 'back',
  RIGHT: 'right',
  LEFT: 'left',
  TOP: 'top',
  BOTTOM: 'bottom',
} as const;

export type FACE = typeof FACE;

export type FACE_VALUES = FACE[keyof FACE];

class Cube extends RenderableObject {
  private vertices: Record<FACE_VALUES, FaceVertices> = {
    [FACE.FRONT]: [-1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1],
    [FACE.BACK]: [-1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1, -1],
    [FACE.TOP]: [-1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1],
    [FACE.BOTTOM]: [-1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1],
    [FACE.RIGHT]: [1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1],
    [FACE.LEFT]: [-1, -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1],
  };

  public verticesColors: Record<FACE_VALUES, string> = {
    [FACE.FRONT]: undefined,
    [FACE.BACK]: undefined,
    [FACE.TOP]: undefined,
    [FACE.BOTTOM]: undefined,
    [FACE.RIGHT]: undefined,
    [FACE.LEFT]: undefined,
  };

  private renderOrder = [
    FACE.BACK,
    FACE.LEFT,
    FACE.BOTTOM,
    FACE.FRONT,
    FACE.RIGHT,
    FACE.TOP,
  ];

  constructor(private size: number, private color = 'black') {
    super();
    for (const face of Object.keys(this.vertices) as FACE_VALUES[]) {
      this.vertices[face] = this.vertices[face].map(
        (vertix) => vertix * (this.size / 2)
      ) as FaceVertices;
    }
  }

  private getNthVertixMatrix(nth: number, vertices: FaceVertices) {
    const [x, y, z] = vertices.slice(nth * 3, nth * 3 + 3);
    return [
      [this.position.x + x],
      [this.position.y + y],
      [this.position.z + z],
    ];
  }

  public render(ctx: CanvasRenderingContext2D) {
    // ctx.strokeStyle = this.color;
    // ctx.beginPath();

    for (const face of this.renderOrder) {
      ctx.beginPath();
      this.renderFace(ctx, this.vertices[face]);
      if (this.verticesColors[face]) {
        ctx.fillStyle = this.verticesColors[face];
        ctx.fill('evenodd');
      }
    }
    // ctx.stroke();
  }

  public setVerticesRenderOrder(order: FACE_VALUES[]) {
    this.renderOrder = order;
  }

  private renderFace(ctx: CanvasRenderingContext2D, vertices: FaceVertices) {
    moveToPoint(
      ctx,
      rotate(this.getNthVertixMatrix(0, vertices), this.rotation)
    );
    lineToPoint(
      ctx,
      rotate(this.getNthVertixMatrix(1, vertices), this.rotation)
    );
    lineToPoint(
      ctx,
      rotate(this.getNthVertixMatrix(2, vertices), this.rotation)
    );
    lineToPoint(
      ctx,
      rotate(this.getNthVertixMatrix(3, vertices), this.rotation)
    );
  }
}

export default Cube;
