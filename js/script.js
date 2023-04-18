import * as THREE from "https://unpkg.com/three/build/three.module.js";
//import { OrbitControls } from './OrbitControls.js'; var controls; all orbitcontrol tools are only used for debugging and production, therefore they are intentionally disabled now
var tick = 0; var timeSpeed; //you can control this
var SetColor; var pause;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  42,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var audio = new Audio('/resources/the-noise-expirement (1).mp3'); audio.volume=0.06; audio.currentTime=0;

audio.play();
// Load the audio file
var audioCtx = new AudioContext();
var audioSrc = audioCtx.createMediaElementSource(audio);
var analyser = audioCtx.createAnalyser();
audioSrc.connect(analyser);
analyser.connect(audioCtx.destination);

// Set the FFT size
analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
var threshold = 12;
// Analyze the audio waveform
function analyze() {
  analyser.getByteFrequencyData(dataArray);
  var sum = 0;
  for (var i = 0; i < bufferLength; i++) {
    sum += dataArray[i];
  }
  var average = sum / bufferLength;
  if (average > threshold) {
    console.log(78);
    timeBounce(0.5);
  }
  else if (cubeStorage[1].boxItem.material.opacity= 0.5){
    for(var ax=0; ax < cubeStorage.length; ax++){
      cubeStorage[ax].boxItem.material.opacity= 1;
    }
  }
}

// Start analyzing the audio waveform



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
      const CubeMat = new THREE.MeshPhysicalMaterial({
        color: cw,
        opacity:0.5,
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

const cubeStorage=[];
function gameEnd(){
  console.log('yo you lost oops') //will finish this within 20th
}

camera.position.x = 0;
camera.position.z = 0;
camera.position.y=-10;
camera.lookAt(0,0,0)
stage.position.y = camera.position.y - 8
//controls = new OrbitControls(camera, renderer.domElement)

timeSpeed = 0.05;

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

scene.fog = new THREE.Fog(0x000000, 1, 36);

var movex=0; var movey=0;

//"functions are yellow" - a certain person (below = theme impl)
function timeSlow(){
  timeSpeed = timeSpeed*4/5
}
function timeBounce(seconds){
  playerMesh.position.y -= seconds;
  for(var ax=0; ax < cubeStorage.length; ax++){
    cubeStorage[ax].boxItem.material.opacity= 0.5;
  }
}



pause=false; let latestYgen=1;
function ntick() {
  requestAnimationFrame(ntick);
  if (keys.esc.pressed==false){
    playerMesh.position.y += timeSpeed;

    if(keys.c.pressed){camera.position.y = playerMesh.position.y - 8; camera.rotation.z+=0.01;sLight.position.y = playerMesh.position.y-1.2;}
    else{camera.position.y = playerMesh.position.y+1; sLight.position.y = playerMesh.position.y+1;
    camera.position.x = playerMesh.position.x, camera.position.z = playerMesh.position.z}
    //camera.rotation.z += 0.001;
    
    playerMesh.rotation.x = timeSpeed*Math.sin(tick/20)*6;

    //moving the player (the ones marked as comment will be tested soon o/)
    if (keys.a.pressed){
      if(playerMesh.position.x-0.4 >-2){
        movex = -0.4;
      }else movex = 0; //playerMesh.position.x=-1.6;
    }
    else if (keys.d.pressed){
      if(playerMesh.position.x+0.4 < 2){
        movex = 0.4;
      }    else movex = 0; //playerMesh.position.x=1.6;
    }
    
    if (keys.w.pressed) {
      if (playerMesh.position.z + 0.4 < 2) {
        movey = 0.4;
      } else movey = 0; 
      //playerMesh.position.z = 1.6;
    } else if (keys.s.pressed) {
      if (playerMesh.position.z - 0.4 > -2) {
        movey = -0.4;
      } else movey = 0;
      //playerMesh.position.z = -1.6;
    }
    cubeStorage.push(new obst(0,playerMesh.position.y+12,0,Math.PI*tick/24,0.2,200,0.01,0.01,0.01,0xff3434, 0.3,0.06))
    cubeStorage.push(new obst(0,playerMesh.position.y+12,0,Math.PI*tick/24,-0.2,200,0.01,0.01,0.01,0xff3434, 0.8,0.06))
    
    
 
    tick++;
    analyze();
    for(var ax=0; ax < cubeStorage.length; ax++){
      cubeStorage[ax].update()
    }
    if(tick*timeSpeed%1==0){
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