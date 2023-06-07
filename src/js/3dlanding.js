import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, 550/300, 0.1, 1000 );
scene.background = new THREE.Color( 0x121212 );


const canvas = document.getElementById('3d-landing');
const renderer = new THREE.WebGLRenderer({canvas}, {antialias: true});
renderer.setSize( 550, 300 );
renderer.outputColorSpace = THREE.SRGBColorSpace;

const light = new THREE.PointLight( 0xffffff, 5, 100 );
light.position.set( 0, 0, 100 );

/*const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );*/

const loader = new GLTFLoader();
let logo_object;

loader.load( '../src/assets/ianlogo2.glb', ( gltf ) => {
    logo_object = gltf;

    gltf.scene.scale.set(6, 6);
    gltf.scene.position.set(-7, 0, 50);

	scene.add( gltf.scene );
    scene.add( light );

}, undefined, function ( error ) {

	console.error( error );

} );

camera.position.z = 100;

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

let originX = windowWidth / 2;
let originY = windowHeight / 2;

let rotate_strength = 1300;
let scale_strength = 50;

function animate() {
	requestAnimationFrame( animate );

    onmousemove = function(e) {

        //Y axis movement
        logo_object.scene.rotation.x = (e.clientY - originY) / rotate_strength;

        //X axis momement
        logo_object.scene.rotation.y = (e.clientX - originX) / rotate_strength;

        //X axis momement
        logo_object.scene.scale.z = Math.abs(e.clientX - originX) / scale_strength;


    
    }

	renderer.render( scene, camera );
}

animate();