import Camera from './camera';
import Scene from './scene';

const ZERO_X = 400;
const ZERO_Y = 450;

class Renderer {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;

  constructor() {
    this.canvas = document.getElementById('app') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');

    this.ctx.translate(ZERO_X, ZERO_Y);
  }

  public render(scene: Scene, camera: Camera) {
    this.ctx.clearRect(-ZERO_X, -ZERO_Y, this.canvas.width, this.canvas.height);

    const objects = scene.getSceneObjects();

    for (const object of objects) {
      object.render(this.ctx);
    }
  }
}

export default Renderer;
