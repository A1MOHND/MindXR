import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';

const container = document.getElementById('3d-container');
const width = container.clientWidth;
const height = container.clientHeight;

// Scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(width, height);
container.appendChild(renderer.domElement);

// Cube geometry + material
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshStandardMaterial({ color: 0x00b894, roughness: 0.5, metalness: 0.7 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Resize handler (optional, but good for responsiveness)
window.addEventListener('resize', () => {
  const w = container.clientWidth;
  const h = container.clientHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
});

// Rotate cube on scroll
function onScroll() {
  const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  const rotation = scrollPercent * Math.PI * 2; // full rotation on full scroll

  cube.rotation.x = rotation;
  cube.rotation.y = rotation;
}

window.addEventListener('scroll', onScroll);

// Initial render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
