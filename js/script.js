import * as THREE from "https://unpkg.com/three/build/three.module.js";
//import { OrbitControls } from './OrbitControls.js'; var controls; all orbitcontrol tools are only used for debugging and production, therefore they are intentionally disabled now
var tick = 0; var speed; //you can control this
var SetColor; var pause; var timeTickSpeed;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  42,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
import stageData from './json/gameStageSetups.json' assert { type: 'json' };
console.log(stageData);




const color2 = new THREE.Color( 'skyblue' );
//scene.background = color2
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);


const alight = new THREE.AmbientLight( 0x878787 );
scene.add( alight );

const stagearea = new THREE.PlaneGeometry(200,200);
stagearea.rotateX( - Math.PI / 2 );
const stagemat = new THREE.MeshStandardMaterial({ color: 0xffffff})
const stage = new THREE.Mesh(stagearea,stagemat); //scene.add(stage)
stage.receiveShadow = true; stage.castShadow=true;

const cube = new THREE.BoxGeometry(10,10,10);



class cubes{
    constructor(posx,posy,posz,direction,speed,duration,sx,sy,sz,cw){
      this.bullet='false'
      const CubeMat = new THREE.MeshPhysicalMaterial({
        color: cw,
        transparent: true,
      });
      
      this.birthtick = tick;
      this.boxItem = new THREE.Mesh(cube,CubeMat);
        this.velocity={
            ang:direction,
            spd:speed
        };
        this.du = duration
        this.position={
            x:posx-sx,
            y:posy-sy,
            z:posz-sz
            
        };
        this.boxItem.scale.set(sx,sy,sz);
        this.boxItem.position.x = this.position.x;
        this.boxItem.position.y = this.position.y;
        this.boxItem.position.z = this.position.z;
        
        scene.add(this.boxItem);
        this.boxItem.receiveShadow = true;
        this.boxItem.castShadow = true;
    }
    update(){
        if (tick - this.birthtick<=this.du){
        this.position.x += this.velocity.spd/100 * Math.cos(this.velocity.ang);
        this.position.z += this.velocity.spd/100 * Math.sin(this.velocity.ang);
        }
        this.boxItem.position.x = this.position.x;
        this.boxItem.position.y = this.position.y;
        this.boxItem.position.z = this.position.z;
        }}



      class obst{
        constructor(posx,posy,posz,direction,speed,duration,sx,sy,sz,cw,mm,hitRad){
          const ObsMat = new THREE.MeshPhysicalMaterial({
            color: cw,
            opacity: mm,
            transparent: true,
          });
          this.bullet = 'obst';
          this.birthtick = tick;
          this.boxItem = new THREE.Mesh(cube,ObsMat);
            this.velocity={
                ang:direction,
                spd:speed
            };
            this.du = duration;
            this.position={
                x:posx-sx,
                y:posy-sy,
                z:posz-sz
                
            };
            this.boxItem.scale.set(sx*0.9,sy*0.9,sz*0.9);
            this.boxItem.position.x = this.position.x;
            this.boxItem.position.y = this.position.y;
            this.boxItem.position.z = this.position.z;
            
            scene.add(this.boxItem);
            this.boxItem.receiveShadow = true;
            this.boxItem.castShadow = true;
            this.hitRad = hitRad;
        }
        update(){
            if (tick - this.birthtick<=this.du){
            this.position.x += this.velocity.spd/100 * Math.cos(this.velocity.ang);
            this.position.z += this.velocity.spd/100 * Math.sin(this.velocity.ang);
            }
            this.boxItem.position.x = this.position.x;
            this.boxItem.position.y = this.position.y;
            this.boxItem.position.z = this.position.z;
            //if(this.position.y +24< camera.position.y){scene.remove(this.boxItem); cubeStorage.splice(cubeStorage.indexOf(this),1);this.boxItem.geometry.dispose(); this.boxItem.material.dispose();}
            this.checks()
            }
        checks(){
          if (this.boxItem.position.distanceTo(playerMesh.position)<this.hitRad){
            gameEnd();
          }
        }
          }
          const turretBodyGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
    const turretBodyMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
    const noseGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.3, 32);
    const noseMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
    
class Turret {
  constructor(x, y, z, direction, speed) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.direction = direction;
    this.speed = speed;
    
    const turretBody = new THREE.Mesh(turretBodyGeometry, turretBodyMaterial);
    scene.add(turretBody)
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    scene.add(nose);
  }

  shoot() {
    // Create a new bullet instance and add it to the scene
    const bullet = new Bullet(this.x, this.y, this.z, this.direction, this.speed);
    scene.add(bullet.mesh);
  }
}

class Bullet {
  constructor(x, y, z, direction, speed) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.direction = direction;
    this.speed = speed;

    // Create the bullet mesh
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(this.x, this.y, this.z);
  }

  update() {
    // Update the bullet position based on its direction and speed
    this.x += Math.cos(this.direction) * this.speed;
    this.z += Math.sin(this.direction) * this.speed;
    this.mesh.position.set(this.x, this.y, this.z);
  }
}

const bulletStorage = [];
const turretStorage = [];
          class glassPanes{
            constructor(posx,posy,posz,left,speed,duration,metal,w){
              const ObsMat = new THREE.MeshPhysicalMaterial({
                color: 0x222b22,
                opacity: 0.4,
                roughness: 0.3,
                envMapIntensity: 1,
                transparent: true,
              });
              if (metal){ObsMat.metalness = metal}
              this.bullet = 'glassPanes';
              this.birthtick = tick;
              this.boxItem = new THREE.Mesh(cube,ObsMat);
                this.velocity={
                    left: left, //bool
                    spd:speed
                };
                this.du = duration;
                this.position={
                    x:posx,
                    y:posy,
                    z:posz
                    
                };
                this.w=w
                this.boxItem.scale.set(this.w/10,0.02,0.9);
                this.boxItem.position.x = this.position.x;
                this.boxItem.position.y = this.position.y;
                this.boxItem.position.z = this.position.z;
                
                scene.add(this.boxItem);
                this.boxItem.receiveShadow = true;
                this.boxItem.castShadow = true;
            }
            update(){
                if (tick - this.birthtick<=this.du){
                  if (this.velocity.left==true){
                    this.position.x += this.velocity.spd/100 * timeTickSpeed;
                  }
                  else {
                    this.position.x -= this.velocity.spd/100 * timeTickSpeed;
                  }
                
                }
                this.boxItem.position.x = this.position.x;
                this.boxItem.position.y = this.position.y;
                this.boxItem.position.z = this.position.z;
                //if(this.position.y +24< camera.position.y){scene.remove(this.boxItem); cubeStorage.splice(cubeStorage.indexOf(this),1);this.boxItem.geometry.dispose(); this.boxItem.material.dispose();}
                this.checks()
                }
            checks(){
              if (Math.abs(this.boxItem.position.x-playerMesh.position.x)<0.5 && Math.abs(this.boxItem.position.y - playerMesh.position.y-1)<this.w/20){
                gameEnd()
              }
            }
              }
    

const cubeStorage=[];
function gameEnd(){
  audio.pause();
  console.log('yo you lost oops') //will finish this within 20th
}

camera.position.x = 0;
camera.position.z = 0;
camera.position.y=-10;
camera.lookAt(0,0,0)
stage.position.y = camera.position.y - 8
//controls = new OrbitControls(camera, renderer.domElement)

speed = 0.05;

function updateScreenInfo(){
  document.getElementById('screensinformation').style.display = 'block';
  document.getElementById("campos").innerHTML = 'x:'+String(camera.position.x)+', y='+String(camera.position.y)+', z='+String(camera.position.z);
  document.getElementById("camang").innerHTML = camera.rotation.z;
  document.getElementById("cubeCount").innerHTML = 'totals: '+String(scene.getObjectById(scene.id, true).children.length)+', cubes: '+String(cubeStorage.length);
}

const SelfShape = new THREE.IcosahedronGeometry(0.3,0);
var selfColor;
if (SetColor){
  selfColor = SetColor
} else {selfColor= 0xabbbff}
const SelfMat = new THREE.MeshStandardMaterial({ color: selfColor});
const playerMesh =  new THREE.Mesh(SelfShape,SelfMat);
scene.add(playerMesh);
playerMesh.position.set(0,0,0);
playerMesh.castShadow = true;
playerMesh.receiveShadow = true;

const fog = new THREE.Fog(0x000000, 1, 36); scene.fog = fog

var movex=0; var movey=0;

//"functions are yellow" - a certain person (below = theme impl)
function timeSlow(){
}

function timeBounce(seconds){
  playerMesh.position.y -= seconds;
  for(var ax=0; ax < cubeStorage.length; ax++){
    if (cubeStorage[ax].bullet=='false') {cubeStorage[ax].boxItem.material.opacity= 0.5;}
  }
  for(var ax=0; ax < bulletStorage.length; ax++){
    bulletStorage[i].update()
  }
}

const slowTfog=new THREE.Color(0x005066); const fastTfog = new THREE.Color(0x665000)

pause=false; let latestYgen=1; timeTickSpeed=1; let start = false
function ntick() {
  requestAnimationFrame(ntick);
  if (keys.esc.pressed==false){
    playerMesh.position.y += speed;

    if(keys.c.pressed){camera.position.y = playerMesh.position.y - 8; sLight.position.y = playerMesh.position.y-1.2; camera.position.x = 0, camera.position.z = 0}
    else{camera.position.y = playerMesh.position.y+1; sLight.position.y = playerMesh.position.y+1;
    camera.position.x = playerMesh.position.x, camera.position.z = playerMesh.position.z}
    //camera.rotation.z += 0.001;
    
    playerMesh.rotation.x = speed*Math.sin(tick/20)*6;

    //moving the player (the ones marked as comment will be tested soon o/)
    if (keys.a.pressed){
        timeTickSpeed=0.5;//slow time

    }
    else if (keys.d.pressed){
        timeTickSpeed=1.5;//fast time

    }
    
    //example function - cubeStorage.push(new obst(0,playerMesh.position.y+12*Math.sin(tick/24)+16,0,Math.PI*tick/12+Math.PI*Math.sin(tick/24),1.2,2000,0.01,0.01,0.01,0x334343, 1,0.06))
    
    
 
   tick++;
    if(start == true){ analyze();}
    for(var ax=0; ax < cubeStorage.length; ax++){
      cubeStorage[ax].update()
    }
    if(tick*speed%1==0){
     //its z axis for y in this case
      playerMesh.position.x += movex; playerMesh.position.z += movey;
      movey = 0;movex=0;
      if(latestYgen<=playerMesh.position.y+40){sceneGen(playerMesh.position.y+40); latestYgen=Math.round(playerMesh.position.y)+40}
        
    }
    if (keys.esc.pressed){pause=true}
    updateScreenInfo();
    //camera.position.x = Math.sin(Math.cos(tick/100))*400*Math.abs(Math.sin(tick/90)+1.2);
    //camera.position.z = Math.sin(Math.sin(tick/100))*400*Math.abs(Math.sin(tick/90)+1.2);
    //camera.position.y = Math.sin(tick/90)*160
    renderer.render(scene, camera);





  }else{
  console.log(tick)
}
}

function sceneGen(ny){
  for (var t=0;t<5;t++){
  cubeStorage.push(new cubes(t-2,ny,Math.random()/2 + 2.5,tick/6*Math.PI, 0,900,0.1,0.1,0.1,0xffffff))
  cubeStorage.push(new cubes(t-2,ny,Math.random()/2 - 3,tick/6*Math.PI, 0,900,0.1,0.1,0.1,0xffffff))
}
for (var t=0;t<5;t++){
  cubeStorage.push(new cubes(Math.random()/2-3 ,ny,t-2,tick/6*Math.PI, 0,900,0.1,0.1,0.1,0xffffff))
  cubeStorage.push(new cubes(Math.random()/2+2.5 ,ny,t-2,tick/6*Math.PI, 0,900,0.1,0.1,0.1,0xffffff))
}

}

function onStart(){
  for (var i=0; i<=50; i++){sceneGen(i-6)}
  
}


onStart()
const sLight = new THREE.PointLight(0x556575,2, 640); //selflight = light on camera.
sLight.position.set(camera.position.x, camera.position.y+8, camera.position.z);
sLight.lookAt(0, 0, 0);
scene.add(sLight);


  ntick();

  
  function analyze() {
    analyser.getByteFrequencyData(dataArray);
    var sum = 0;
    for (var i = 0; i < bufferLength; i++) {
      sum += dataArray[i];
    }
    var average = sum / bufferLength;
    if (average > threshold) {
      timeBounce(0.5);
    }
    else if (cubeStorage[1].boxItem.material.opacity= 0.5){
      for(var ax=0; ax < cubeStorage.length; ax++){
        if (cubeStorage[ax].bullet=='false') {
        cubeStorage[ax].boxItem.material.opacity= 1;
        
      }
      }
    }
  }
  
  var audio
var audioCtx; var audioSrc; var analyser; var bufferLength; var dataArray; var threshold;
  function gameStart(){
    const rv = document.getElementById('homeScreenCom');
    console.log(rv)
    rv.style.display='none'
    start=true
const notif = document.getElementById("notif");
const lvlEl = document.createElement("p");
const oneEl = document.createElement("p");
lvlEl.setAttribute("id", "lvl");
lvlEl.textContent = 'stage 1';
lvlEl.className='fade';
oneEl.setAttribute("id", "one");
oneEl.textContent = stageData.stageData["1"].displayName;
oneEl.className='fade'
notif.appendChild(lvlEl);
notif.appendChild(oneEl);

turretStorage.push(new Turret(-2,playerMesh.position.y+24,0))

for(var t=0; t<stageData.stageData[1].stageObjectSpawnTimeLeft.length; t++){
  cubeStorage.push(new glassPanes(-3,playerMesh.position.y+stageData.stageData[1].stageObjectSpawnTimeLeft[t],0,true,1,13000,0.2,1.2))
}
for(var t=0; t<stageData.stageData[1].stageObjectSpawnTimeLeft.length; t++){
  cubeStorage.push(new glassPanes(-3,playerMesh.position.y+stageData.stageData[1].stageObjectSpawnTimeLeft[t],0,false,1,13000,0.2,1.2))
}

audio = new Audio('/resources/tnex.mp3'); audio.volume=0.06; audio.currentTime=0;

  // Load the audio file
  audioCtx = new AudioContext();
  audioSrc = audioCtx.createMediaElementSource(audio);
  analyser = audioCtx.createAnalyser();
  audioSrc.connect(analyser);
  analyser.connect(audioCtx.destination);
  
  // Set the FFT size
  analyser.fftSize = 2048;
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
  threshold = 12;
  // Analyze the audio waveform

audio.play();

  };
  





  
const button = document.querySelector('#startButton');
button.addEventListener('click', gameStart);

document.addEventListener("fullscreenchange", function () {
  if (document.fullscreenElement) {
    location.reload();
  } else {
    location.reload();
  }
});