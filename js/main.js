
var renderer;
var scene;
var camera;
var cameraControl;

var depth = 100;
var width = 200;
var margin = 10;
var MAX_HEIGHT = 10;


function initThree(){
    //// INIT
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);

    ////RENDERER
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;


    // position and point the camera to the center of the scene
    camera.position.x = 500;
    camera.position.y = 40;
    camera.position.z = 1000;
    camera.lookAt(scene);

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(10, 20, 20);
    spotLight.shadowCameraNear = 20;
    spotLight.shadowCameraFar = 50;
    spotLight.castShadow = true;
    scene.add(spotLight);

    scene.add(new THREE.AmbientLight(0xaaaaaa));

    // create a cube
    var cubeGeometry = new THREE.BoxGeometry(6, 4, 6);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 'red'});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);


    // position and point the camer

    cube.castShadow = true;

    createPlane3D(depth, width,margin, MAX_HEIGHT);

    // scene.add(cube);


    document.body.appendChild(renderer.domElement);

    ////EXTRA
    cameraControl = new THREE.OrbitControls(camera);

    // control = new function(){
    //     this.camX = 40;
    //     this.camY = 40;
    //     this.camZ = 50;
    // };
    // addControlGui(control);
    addStatsObject();  

    render();

    window.addEventListener('resize', handleResize, false);

}


function render() {
    // camera.position.x = control.camX;
    // camera.position.y = control.camY;
    // camera.position.z = control.camZ;
    cameraControl.update();
    stats.update();
    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

function addControlGui(controlObject) {
    var gui = new dat.GUI();
    gui.add(controlObject, 'camX', -50, 50);
    gui.add(controlObject, 'camY', 0, 200);
    gui.add(controlObject, 'camZ', -50, 50);
}

function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.body.appendChild(stats.domElement);
}

function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


window.onload = initThree;