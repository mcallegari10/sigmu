import * as THREE from 'three';
import textureAsset from "./assets/Carbon.png";

var texture = new THREE.TextureLoader().load( textureAsset );
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.SphereGeometry( 13, 32, 32 );
var material = new THREE.MeshBasicMaterial( {map: texture} );
var sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

camera.position.z = 50;

var animate = function () {
	requestAnimationFrame( animate );

	sphere.rotation.x += 0.005;
	sphere.rotation.y += 0.01;

	renderer.render( scene, camera );
};

animate()

export default function init() {
  document.getElementById('example').appendChild(renderer.domElement);
}
