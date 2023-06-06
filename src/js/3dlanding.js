import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 500/300, 0.1, 1000 );
scene.background = new THREE.Color( 0x121212 );


const canvas = document.getElementById('3d-landing');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( 500, 300 );

/*const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );*/

const loader = new GLTFLoader();
let logo_object;

loader.load( '../src/assets/ianlogo2.glb', ( gltf ) => {
    logo_object = gltf;

    gltf.scene.scale.set(10, 10, 1000);
    gltf.scene.position.set(-5, 0, 60);

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

camera.position.z = 100;

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

let originX = windowWidth / 2;
let originY = windowHeight / 2;

let rotate_strength = 1300;

function animate() {
	requestAnimationFrame( animate );

    onmousemove = function(e) {

        //Y axis movement
        logo_object.scene.rotation.x = (e.clientY - originY) / rotate_strength;

        //X axis momement
        logo_object.scene.rotation.y = (e.clientX - originX) / rotate_strength;
    }

	renderer.render( scene, camera );
}

animate();