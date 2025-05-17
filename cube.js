import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/MTLLoader.js';

const container = document.createElement('div');
container.style.position = 'fixed';
container.style.top = '50%';
container.style.left = '50%';
container.style.transform = 'translate(-50%, -50%)';
container.style.width = '300px';
container.style.height = '300px';
container.style.pointerEvents = 'none';
document.body.appendChild(container);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  300 / 300,
  0.1,
  1000
);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(300, 300);
container.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

let model = null;

// Load materials first (optional)
const mtlLoader = new MTLLoader();
mtlLoader.load('./models/vr_headset.mtl', (materials) => {
  materials.preload();

  // Load OBJ
  const objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.load('./models/vr_headset.obj', (object) => {
    model = object;
    model.scale.set(0.5, 0.5, 0.5); // adjust scale if needed
    scene.add(model);
  }, undefined, (error) => {
    console.error('Error loading OBJ:', error);
  });
}, undefined, (error) => {
  console.warn('MTL file not found or failed to load, loading OBJ without materials');
  // fallback if no MTL file, just load OBJ without materials
  const objLoader = new OBJLoader();
  objLoader.load('./models/vr_headset.obj', (object) => {
    model = object;
    model.scale.set(0.5, 0.5, 0.5);
    scene.add(model);
  }, undefined, (error) => {
    console.error('Error loading OBJ:', error);
  });
});

let scrollPercent = 0;

window.addEventListener('scroll', () => {
  scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);

  if (model) {
    model.rotation.y = scrollPercent * Math.PI * 2 * 3; // rotate on scroll
    model.rotation.x = scrollPercent * Math.PI * 2 * 2;
  }

  renderer.render(scene, camera);
}

animate();
