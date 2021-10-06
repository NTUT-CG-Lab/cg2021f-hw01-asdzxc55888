const zodiacTexts = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
function Clock() {
    const geometry = new THREE.CircleGeometry(300, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity:0.5, transparent:true });
    geometry.computeBoundingBox();
    geometry.computeVertexNormals();

    const centerOffset = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    clock = new THREE.Mesh(geometry, material);
    clock.position.x = centerOffset + 300;
    zodiac = new THREE.Group();
    clock.add(zodiac);
    for (let index = 0; index < 12; index++) {
        let x = Math.cos(-index * Math.PI / 6 + (1 / 2) * Math.PI) * 220;
        let y = Math.sin(-index * Math.PI / 6 + (1 / 2) * Math.PI) * 220;
        clock.add(ClockElement(x, y));
        zodiac.add(CreateZodiacTexts(zodiacTexts[index], index, x, y));
    }
    var today = new Date();
    var hh = today.getHours();
    var mm = today.getMinutes();
    var ss = today.getSeconds();
    let secondHandMesh = CreateSecondHand(ss);
    let minuteHandMesh = CreateMinuteHand(mm, ss);
    let hourHandMesh = CreateHourHand(hh, mm);
    clock.add(secondHandMesh);
    clock.add(minuteHandMesh);
    clock.add(hourHandMesh);
    window.setInterval(( () => SetRotation(secondHandMesh, minuteHandMesh, hourHandMesh) ), 500);
    return clock;
}

function ClockElement(x, y) {
    const geometry = new THREE.CircleGeometry(50, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    geometry.computeBoundingBox();
    geometry.computeVertexNormals();

    const clockElement = new THREE.Mesh(geometry, material);
    clockElement.position.x = x;
    clockElement.position.y = y;
    clockElement.position.z = 1;
    return clockElement;
}

function CreateZodiacTexts(text, index, x, y) {

    let textGeo = new THREE.TextGeometry(text, ({ ...textConfig, font: font }));

    textGeo.computeBoundingBox();
    textGeo.computeVertexNormals();

    const centerOffsetX = - 0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
    const centerOffsetY = - 0.5 * (textGeo.boundingBox.max.y - textGeo.boundingBox.min.y);

    let textMesh = new THREE.Mesh(textGeo, material);

    textMesh.position.x = centerOffsetX + x;
    textMesh.position.y = centerOffsetY + y + 10;
    textMesh.position.z = 0;

    textMesh.userData = {
        link: `https://ntut-cg-lab.github.io/cg2021f-hw${(index + 1).toString().padStart(2, '0')}-asdzxc55888/`
    }
    return textMesh;
}

function CreateSecondHand(second) {
    const length = 165;
    const geometry = new THREE.PlaneGeometry(2, length);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
    const secondHand = new THREE.Mesh(geometry, material);
    geometry.translate(0, length / 2, 2)
    secondHand.rotation.z = -second * Math.PI / 30;
    return secondHand;
}

function CreateMinuteHand(minute, second) {
    const length = 180;
    const geometry = new THREE.PlaneGeometry(4, length);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
    const minuteHand = new THREE.Mesh(geometry, material);
    geometry.translate(0, length / 2, 2)
    minuteHand.rotation.z = -minute * Math.PI / 30 + (-second * Math.PI / 1800);
    return minuteHand;
}

function CreateHourHand(hour, minute) {
    const length = 100;
    const geometry = new THREE.PlaneGeometry(6, length);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
    const hourHand = new THREE.Mesh(geometry, material);
    geometry.translate(0, length / 2, 2)
    hourHand.rotation.z = -hour * Math.PI / 6 + (-minute * Math.PI / 360);
    return hourHand;
}

function SetRotation(secondHandMesh, minuteHandMesh, hourHandMesh) {
    var today = new Date();
    var hh = today.getHours();
    var mm = today.getMinutes();
    var ss = today.getSeconds();
    secondHandMesh.rotation.z = -ss * Math.PI / 30;
    minuteHandMesh.rotation.z = -mm * Math.PI / 30 + (-ss * Math.PI / 1800);
    hourHandMesh.rotation.z = -hh * Math.PI / 6 + (-mm * Math.PI / 360);
}