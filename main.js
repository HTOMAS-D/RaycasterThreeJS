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

const floorWidth = 40;
const floorDepth = 40;

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
ceiling.position.set(0, 0, 5); 
scene.add(ceiling);

camera.position.set(0, 0, 2.5); 
camera.lookAt(0, 30, 0); 

const keys = {
    w: false,
    s: false,
    a: false,
    d: false,
  };

document.addEventListener("keydown", (event) => {
    if (event.key === "a" || event.key ==='A') {
      keys.a = true;
    } else if (event.key === "d" || event.key === 'D') {
      keys.d = true;
    } else if (event.key === "w" || event.key === "W") {
      keys.w = true;
    } else if (event.key === "s" || event.key === "S") {
      keys.s = true;
    }
  });
  
  document.addEventListener("keyup", (event) => {
    if (event.key === "a" || event.key ==='A') {
        keys.a = false;
      } else if (event.key === "d" || event.key === 'D') {
        keys.d = false;
      } else if (event.key === "w" || event.key === "W") {
        keys.w = false;
      } else if (event.key === "s" || event.key === "S") {
        keys.s = false;
      }
  });
  

function updateCamera() {
    const cameraSpeed = 0.2;

    // Get the camera's direction vector
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);

    // Normalize the direction vector
    cameraDirection.normalize();

    if (keys.w) {
        // Move the camera forward in the direction it's facing
        camera.position.addScaledVector(cameraDirection, cameraSpeed);
    }
    if (keys.s) {
        // Move the camera backward in the opposite direction it's facing
        camera.position.addScaledVector(cameraDirection, -cameraSpeed);
    }
    if (keys.d) {
        // Move the camera to the right relative to its orientation
        const cameraRight = new THREE.Vector3();
        camera.getWorldDirection(cameraRight);
        cameraRight.crossVectors(camera.up, cameraDirection);
        camera.position.addScaledVector(cameraRight, cameraSpeed);
    }
    if (keys.a) {
        // Move the camera to the left relative to its orientation
        const cameraLeft = new THREE.Vector3();
        camera.getWorldDirection(cameraLeft);
        cameraLeft.crossVectors(cameraDirection, camera.up);
        camera.position.addScaledVector(cameraLeft, cameraSpeed);
    }
}



function animate() {
  requestAnimationFrame(animate);

  updateCamera();

  renderer.render(scene, camera);
}

animate();
