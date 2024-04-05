import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9900ff);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const floorWidth = 100;
const floorDepth = 20;

const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(floorWidth, floorDepth),
  floorMaterial
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const ceilingMaterial = new THREE.MeshBasicMaterial({ color: 0x080808 });
const ceiling = new THREE.Mesh(
  new THREE.PlaneGeometry(floorWidth, floorDepth),
  ceilingMaterial
);
ceiling.rotation.x = Math.PI / 2;
ceiling.position.y = 5.5;
scene.add(ceiling);

// Set camera position above the floor
camera.position.set(0, 2, 0);
camera.lookAt(1, 2, 0);

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();
