import Camera from './camera';
import Cube from './objects/cube';
import Point from './objects/point';
import Vector from './objects/vector';
import Renderer from './renderer';
import RubiksCube from './rubiksCube';
import Scene from './scene';

const xAxis = new Vector(new Point(-400, 0, 0), new Point(400, 0, 0), 'green');
const yAxis = new Vector(new Point(0, 400, 0), new Point(0, -400, 0), 'red');
const zAxis = new Vector(new Point(0, 0, 400), new Point(0, 0, -400), 'blue');

const scene = new Scene();
const renderer = new Renderer();
const camera = new Camera(20, 500, 300, 1000, 10, 2000);

const rubiksCube = new RubiksCube();

scene.add(xAxis);
scene.add(yAxis);
scene.add(zAxis);

scene.add(rubiksCube);

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();
