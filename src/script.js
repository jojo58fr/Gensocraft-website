import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as dat from 'dat.gui'

//"Torii" (https://skfb.ly/MYyA) by kazukisakamoto is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

// Objects

//const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
/*const fbxLoader = new FBXLoader()
fbxLoader.load( 'models/Torii_M.fbx', function ( object ) {

    scene.add( object );

}, undefined, function ( e ) {

  console.error( e );

} );*/

let toriiTexture, toriiNormal, toriiMetalness, toriiMatRough;
toriiTexture = new THREE.TextureLoader().load('models/Torii_M_defaultMat_color.jpg');

// immediately use the texture for material creation
const toriiMaterial = new THREE.MeshBasicMaterial( { map: toriiTexture } );

const loader = new GLTFLoader();
loader.load( 'models/Torii_M.glb', function ( gltf ) {

    let mesh = gltf.scene;
    //mesh.material = toriiMaterial;
	scene.add( mesh );


}, undefined, function ( error ) {

	console.error( error );

} );

// Materials

//const material = new THREE.MeshBasicMaterial()
//material.color = new THREE.Color(0xff0000)

// Mesh
//const sphere = new THREE.Mesh(geometry,material)
//scene.add(sphere)

// Lights

const light = new THREE.PointLight();
light.position.set(0.8, 1.4, 1.0);
scene.add(light);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 3.0)
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    //sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()