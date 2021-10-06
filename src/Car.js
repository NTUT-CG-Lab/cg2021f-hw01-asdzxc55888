let carMesh;
let dirX = 1;
let dirZ = 1;
function CreateCar() {
    const plyloader = new THREE.PLYLoader();
    plyloader.load('../model/bus_ply.ply',
        function (geometry) {
            let plyMaterial = new THREE.MeshPhysicalMaterial({
                color: 0xffffff,
            })
            geometry.rotateY(Math.PI);
            geometry.computeVertexNormals()
            carMesh = new THREE.Mesh(geometry, plyMaterial)
            carMesh.scale.multiplyScalar(0.025);
            carMesh.position.y = 30;
            scene.add(carMesh);
        }
    );
    window.setInterval((() => CarMove()), 30);
    window.setInterval((() => CarForward()), 10);
}

function CarMove() {
    if (carMesh != undefined) {
        let x = carMesh.position.x;
        let z = carMesh.position.z;
        if(Math.abs(x) > planeWidth/2 - 120 || Math.abs(z) > planeHeight/2 - 120)
            carMesh.rotateY(Math.PI / 30 * Math.random());
    }
}

function CarForward() {
    if (carMesh != undefined) {
        carMesh.translateX(dirX);
    }
}