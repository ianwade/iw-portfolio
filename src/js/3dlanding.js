import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, 550/300, 0.1, 1000 );
//scene.background = new THREE.Color( 0x121212 );


const canvas = document.getElementById('3d-landing');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize( 550, 300 );
renderer.outputColorSpace = THREE.SRGBColorSpace;

const light_direct = new THREE.AmbientLight( 0xfc7de3, .7, 100 );

const light_side = new THREE.PointLight( 0xfffce0, 4, 100 );
light_side.position.set( 0, 0, 100 );

const light_side2 = new THREE.PointLight( 0xb27dfc, 3, 100 );
light_side2.position.set( -10, 0, 100 );

/*const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );*/

const loader = new GLTFLoader();
let logo_object;

loader.load( '../src/assets/ianlogo2.glb', ( gltf ) => {
    logo_object = gltf;

    gltf.scene.scale.set(6, 6);
    gltf.scene.position.set(0, 0, 47);

	scene.add( gltf.scene );
    scene.add( light_direct );
    scene.add( light_side );
    //scene.add( light_side2 );

}, undefined, function ( error ) {

	console.error( error );

} );

camera.position.z = 100;

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

let originX = windowWidth / 2;
let originY = windowHeight / 2;

let rotate_strength = 1300;
let scale_strength = 20;

let screen_width_min = 100;
let screen_width_max = 1412;

let screen_height_min = 100;
let screen_height_max = 882;

function animate() {
	requestAnimationFrame( animate );

    const bg_mover = document.getElementById('landing--bg');

    onmousemove = function(e) {
        //up-down movement
        if(e.clientY >= screen_height_min && e.clientY <= screen_height_max)
            logo_object.scene.rotation.x = (e.clientY - originY) / rotate_strength;

        //left-right axis momement
        if(e.clientX >= screen_width_min && e.clientX <= screen_width_max)
            logo_object.scene.rotation.y = (e.clientX - originX) / rotate_strength;

        //extrusion
        logo_object.scene.scale.z = Math.abs(e.clientX - originX) / scale_strength + 1;

        bg_mover.style.backgroundPositionX = -1 * (e.clientX / 20) + "px";
        bg_mover.style.backgroundPositionY = -1 * (e.clientY / 20) + "px";
    
    }

	renderer.render( scene, camera );
}

animate();
