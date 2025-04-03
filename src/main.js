import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Scene Setup
const scene = new THREE.Scene();

// Camera Setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 2, 5);

// Renderer Setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Lighting Setup
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); // Ambient light for overall brightness
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(0, 5, 5);
pointLight.castShadow = true;
scene.add(pointLight);

// Ground (for shadows)
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// OrbitControls (Mouse Movement)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 2;
controls.maxDistance = 20;
controls.maxPolarAngle = Math.PI / 2;

// Load 3D Model
const ghar = new GLTFLoader();
ghar.load('./models/ghar.glb', (gltf) => {
    const model = gltf.scene;
    model.position.set(0, 0, 0);  // Adjust position if needed
    model.scale.set(2, 2, 2);  // Scale the model
    model.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(model);
});

const ac = new GLTFLoader();
ac.load('./models/ac.glb', (gltf) => {
    const model = gltf.scene;
    model.position.set(-1.75, 6, -3);  // Adjust position if needed
    model.scale.set(0.3, 0.3, 0.3);  // Scale the model
    model.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(model);
});

const heater = new GLTFLoader();
heater.load('./models/heater.glb', (gltf) => {
    const model = gltf.scene;
    model.position.set(-3.4, 1.7, 3);  // Adjust position if needed
    model.scale.set(2,2,2);  // Scale the model
    model.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(model);
});



// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Smooth camera movement
    renderer.render(scene, camera);
}

animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});