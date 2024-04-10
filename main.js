import { SourceNode } from "source-map-js/lib/source-node";
import * as THREE from "three";

////// MAP AND CAMERA SETUP

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

const floorWidth = 50;
const floorDepth = 50;
const wallWidht = 6;
const wallDepth = 50;

const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(floorWidth, floorDepth),
  floorMaterial
);
floor.position.set(0, 0, 0);
scene.add(floor);

const ceilingMaterial = new THREE.MeshBasicMaterial({ color: 0x080808 });
const ceiling = new THREE.Mesh(
  new THREE.PlaneGeometry(floorWidth, floorDepth),
  ceilingMaterial
);
ceiling.rotation.y = Math.PI;
ceiling.position.set(0, 0, 5);
scene.add(ceiling);

const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xcccc33 });
const leftWall = new THREE.Mesh(
  new THREE.PlaneGeometry(wallWidht, wallDepth),
  wallMaterial
);
const rightWall = new THREE.Mesh(
  new THREE.PlaneGeometry(wallWidht, wallDepth),
  wallMaterial
);

leftWall.rotation.y = Math.PI / 2;
leftWall.position.set(-24, 0, 3);
scene.add(leftWall);
rightWall.rotation.y = -Math.PI / 2;
rightWall.position.set(24, 0, 3);
scene.add(rightWall);

camera.position.set(0, 0, 2.5);
camera.lookAt(0, 180, 1);

/////// ASSETS

//Ring//
const ringGeometry = new THREE.RingGeometry(0.2, 1, 32);
const ringMaterial = new THREE.MeshBasicMaterial({
  color: 0xff6666,
  side: THREE.DoubleSide,
  wireframe: true,
});
const ring = new THREE.Mesh(ringGeometry, ringMaterial);
ring.position.set(0, 9, 2.5);
ring.rotation.x = Math.PI / 2;

scene.add(ring);

//torus//
const torusGeometry = new THREE.TorusGeometry(0.5, 0.2, 10, 50);
const torusMaterial = new THREE.MeshBasicMaterial({
  color: 0x033E5C,
  side: THREE.DoubleSide,
  wireframe: true,
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(2, 3, 2.5);
torus.rotation.x = Math.PI / 2;

scene.add(torus);



//tests//
// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );



//FOG
// scene.fog = new THREE.Fog( 0xcccccc, 10, 15 );
// scene.fog.far;

/////// KEYS

const keys = {
  w: false,
  s: false,
  a: false,
  d: false,
};

document.addEventListener("keydown", (event) => {
  if (event.key === "a" || event.key === "A") {
    keys.a = true;
  } else if (event.key === "d" || event.key === "D") {
    keys.d = true;
  } else if (event.key === "w" || event.key === "W") {
    keys.w = true;
  } else if (event.key === "s" || event.key === "S") {
    keys.s = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "a" || event.key === "A") {
    keys.a = false;
  } else if (event.key === "d" || event.key === "D") {
    keys.d = false;
  } else if (event.key === "w" || event.key === "W") {
    keys.w = false;
  } else if (event.key === "s" || event.key === "S") {
    keys.s = false;
  }
});

function updateCamera() {
  const cameraSpeed = 0.2;

  const cameraDirection = new THREE.Vector3();
  camera.getWorldDirection(cameraDirection);

  cameraDirection.normalize();

  if (keys.w) {
    camera.position.addScaledVector(cameraDirection, cameraSpeed);
  }
  if (keys.s) {
    camera.position.addScaledVector(cameraDirection, -cameraSpeed);
  }
  if (keys.d) {
    const cameraLeft = new THREE.Vector3();
    camera.getWorldDirection(cameraLeft);
    cameraLeft.crossVectors(cameraDirection, camera.up);
    camera.position.addScaledVector(cameraLeft, cameraSpeed);
  }
  if (keys.a) {
    const cameraRight = new THREE.Vector3();
    camera.getWorldDirection(cameraRight);
    cameraRight.crossVectors(camera.up, cameraDirection);
    camera.position.addScaledVector(cameraRight, cameraSpeed);
  }
}

function animate() {
  requestAnimationFrame(animate);
  ring.rotation.x += 0.01;
  ring.rotation.y += 0.01;
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;

  updateCamera();

  renderer.render(scene, camera);
}

animate();
