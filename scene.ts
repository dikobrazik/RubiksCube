import { RenderableObject } from './objects/renderable';

class Scene {
  private objects: RenderableObject[] = [];

  public add(...object: RenderableObject[]) {
    this.objects.push(...object);
  }

  public getSceneObjects() {
    return this.objects;
  }
}

export default Scene;
