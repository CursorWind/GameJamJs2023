import * as THREE from "https://unpkg.com/three/build/three.module.js";
//import { OrbitControls } from './OrbitControls.js'; var controls; all orbitcontrol tools are only used for debugging and production, therefore they are intentionally disabled now
var tick = 0; var speed; //you can control this
var SetColor; var pause = false; var timeTickSpeed; let attempt = 0;
const scene = new THREE.Scene(); let difficulty=0; //1 = easy 2 = normal 3= hard
const camera = new THREE.PerspectiveCamera(
  42,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
import stageData from './json/gameStageSetups.json' assert { type: 'json' };

const renderer = new THREE.WebGLRenderer({ logarithmicDepthBuffer: true });
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
const boundaryMat = new THREE.MeshPhysicalMaterial({color:0xffffff})

const leftB = new THREE.Mesh(cube,boundaryMat);
leftB.position.x= -2.5;
leftB.position.z= 0;
leftB.scale.set(0.01, 40, 3)
const rightB = new THREE.Mesh(cube, boundaryMat);
rightB.position.x = 2.5;
rightB.position.z = 0;
rightB.scale.set(0.01, 40, 3);
const topB = new THREE.Mesh(cube, boundaryMat);
topB.position.x = 0;
topB.position.z = 2.5;
topB.scale.set(3, 40, 0.01);
const botB = new THREE.Mesh(cube, boundaryMat);
botB.position.x = 0;
botB.position.z = -2.5;
botB.scale.set(3, 40, 0.01);

scene.add(leftB);
scene.add(rightB);
scene.add(topB);
scene.add(botB);


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

        if (start==false){this.eraseSelf()}
        }
      eraseSelf(){
        if(this.position.y +3< camera.position.y && this.position.y > 40){scene.remove(this.boxItem); cubeStorage.splice(cubeStorage.indexOf(this),1);this.boxItem.geometry.dispose(); this.boxItem.material.dispose();}
      }
      }



      class obst{
        constructor(posx,posy,posz,direction,speed,duration,cw,hitRad){
          const ballGeometry = new THREE.IcosahedronGeometry(hitRad,10)
          var ObsMat = new THREE.MeshPhongMaterial({
            color: cw,
            specular: 0xf1c40f, 
            shininess: 50, 
            reflectivity: 1,
            opacity: 0.9,
            transparent: true,
          });
          this.hitRad = hitRad;
          this.bullet = 'obst';
          this.birthtick = tick;
          this.boxItem = new THREE.Mesh(ballGeometry,ObsMat);
            this.velocity={
                ang:direction,
                spd:speed
            };
            this.du = duration;
            this.position={
                x:posx,
                y:posy,
                z:posz
                
            };
            this.boxItem.radius = this.hitrad
            this.boxItem.position.x = this.position.x;
            this.boxItem.position.y = this.position.y;
            this.boxItem.position.z = this.position.z;
            
            scene.add(this.boxItem);
            this.boxItem.receiveShadow = true;
            this.boxItem.castShadow = true;
            
        }
        update(){
            if (tick - this.birthtick<=this.du){
            this.position.x += this.velocity.spd/100 * Math.cos(this.velocity.ang) *timeTickSpeed;
            this.position.z += this.velocity.spd/100 * Math.sin(this.velocity.ang) *timeTickSpeed;
            }
            this.boxItem.position.x = this.position.x;
            this.boxItem.position.y = this.position.y;
            this.boxItem.position.z = this.position.z;
            this.boxItem.rotation.y+=Math.random()*timeTickSpeed/100
            //if(this.position.y +24< camera.position.y){scene.remove(this.boxItem); cubeStorage.splice(cubeStorage.indexOf(this),1);this.boxItem.geometry.dispose(); this.boxItem.material.dispose();}
            this.checks()
            }
            checks() {
              // Check for collision with walls
              if (this.position.x < -2.25 + this.hitRad || this.position.x > 2.25 - this.hitRad) {
                this.velocity.ang = Math.PI - this.velocity.ang; // Reverse angle
              }
              if (this.position.z < -2.25 + this.hitRad || this.position.z > 2.25 - this.hitRad) {
                this.velocity.ang = -this.velocity.ang; // Reverse angle
              }
            
              // Check for collision with player
              if (this.boxItem.position.distanceTo(playerMesh.position) < this.hitRad) {
                gameEnd();
                notify(`Collision with ballMesh${this}`)
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
          left: left,
          spd:speed
      };
      this.du = duration;
      this.position={
          x:posx,
          y:posy,
          z:posz
          
      };
      this.w=w+difficulty/3;
      if (this.velocity.left == 'left' || this.velocity.left=='right'){
        this.boxItem.scale.set(this.w/10,0.02,0.9);
      }
      
      this.boxItem.position.x = this.position.x;
      this.boxItem.position.y = this.position.y;
      this.boxItem.position.z = this.position.z;
      
      scene.add(this.boxItem);
      this.boxItem.receiveShadow = true;
      this.boxItem.castShadow = true;
  }
  update(){
    if(this.position.y-playerMesh.position.y < 24){              
      if (tick - this.birthtick<=this.du){
        if (this.velocity.left=='left'){
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
    }
  checks(){
var firstBB = new THREE.Box3().setFromObject(this.boxItem);
var secondBB = new THREE.Box3().setFromObject(playerMesh);

var collision = firstBB.intersectsBox(secondBB);

if (collision) {
  notify(`Collision with glass`)
  gameEnd();
}
  }
  eraseSelf(){
    scene.remove(this.boxItem); cubeStorage.splice(cubeStorage.indexOf(this),1);this.boxItem.geometry.dispose(); this.boxItem.material.dispose();
  }
  dispose() {
    scene.remove(this.boxItem);
    this.boxItem.geometry.dispose();
    this.boxItem.material.dispose();
  }
    }

    

const cubeStorage=[];
function gameEnd(){
  console.log(playerMesh.position.y, tick)

  audio.pause();
  restart()
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

const SelfShape = new THREE.IcosahedronGeometry(0.2,0);
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

//"functions are yellow" - a certain person 
//below = theme implementation
function timeBounce(seconds){
  playerMesh.position.y -= seconds;
  for(var ax=0; ax < cubeStorage.length; ax++){
    if (cubeStorage[ax].bullet=='false') {cubeStorage[ax].boxItem.material.opacity= 0.5;}
  }
}

const slowTfog=new THREE.Color(0x002022); const fastTfog = new THREE.Color(0x222000); const blackFog=fog.color;

let latestYgen=30; timeTickSpeed=1; let start = false
function ntick() {
  requestAnimationFrame(ntick);
  if (pause==false){
    playerMesh.position.y += speed;

    if(keys.c.pressed){camera.position.y = playerMesh.position.y - 8; sLight.position.y = playerMesh.position.y-1.2; camera.position.x = 0, camera.position.z = 0}
    else{camera.position.y = playerMesh.position.y+1; sLight.position.y = playerMesh.position.y;
    camera.position.x = playerMesh.position.x, camera.position.z = playerMesh.position.z}
    //camera.rotation.z += 0.001;
    
    playerMesh.rotation.x = speed*Math.sin(tick/20)*6;
    if (keys.a.pressed){
        timeTickSpeed=0.5;//slow time
        fog.color=slowTfog

    }
    else if (keys.d.pressed){
        timeTickSpeed=1.5;//fast time
        fog.color=fastTfog

    }else {fog.color=blackFog; timeTickSpeed=1}
    
    //example function - cubeStorage.push(new obst(0,playerMesh.position.y+12*Math.sin(tick/24)+16,0,Math.PI*tick/12+Math.PI*Math.sin(tick/24),1.2,2000,0.01,0.01,0.01,0x334343, 1,0.06))
    
    leftB.position.y = playerMesh.position.y+10;
    botB.position.y = playerMesh.position.y+10;
    topB.position.y = playerMesh.position.y+10;
    rightB.position.y = playerMesh.position.y+10;
    
   tick++;
   if(stageData.stageData[1].stageObjectSpawnTimeLeft.includes(tick) && start){
    var xq = Math.random()+0.2;
    cubeStorage.push(new glassPanes(-3,playerMesh.position.y+24,0,'left',xq+0.4,13000,0.2,0.8))
  }
  if(stageData.stageData[1].stageObjectSpawnTimeRight.includes(tick) && start){
    var xq = Math.random()+0.2;
    cubeStorage.push(new glassPanes(3,playerMesh.position.y+24,0,'right',xq,13000,0.2,0.8))
  }
  if(stageData.stageData[1].stageObjectSpawnTimeBall.includes(tick) && start){
    var xq = Math.random()+0.2;
    cubeStorage.push(new obst(1,playerMesh.position.y+36,1,Math.PI*tick/12,difficulty*1.5,12000,0xaafaff,Math.sqrt(tick/2)/100))
  }
    if(start == true){ analyze();}
    for(var ax=0; ax < cubeStorage.length; ax++){
      cubeStorage[ax].update()
    }
    for(var ax=0; ax < bulletStorage.length; ax++){
      bulletStorage[ax].update()
    }
    
    if(tick*speed%1==0){latestYgen+=1
      sceneGen(latestYgen);
        
    }
    updateScreenInfo();
    renderer.render(scene, camera);





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
  for (var i=0; i<=56; i++){sceneGen(i-6)}
  latestYgen=50;

  
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
    rv.style.display='none'
    



restart()

  };
  

  function cleanScene() {
    let objectsToRemove = [];
    
    scene.traverse((object) => {
      if (
        object !== playerMesh &&
        object !== camera &&
        object !== alight &&
        object !== sLight &&
        object !== leftB &&
        object !== rightB &&
        object !== botB &&
        object !== topB
      ) {
        objectsToRemove.push(object);
      }
    });
  
    objectsToRemove.forEach((object) => {
      scene.remove(object);
    });
  
    console.log(`Removed ${objectsToRemove.length} objects from the scene. ${scene.children.length}`);
  }
  
  
  
  
    
  
function restart(){
  
speed=0;

  cleanScene();
var cov = document.getElementById("ambience");
cov.style.opacity = 1.0;
pauseMenu.classList.remove("show");
pause=false;
  setTimeout(() => pauseOverlay.style.display = "none", 50);
setTimeout(function() {
    cov.style.transition = "opacity 1.2s";
    cov.style.opacity = 0.0;
}, 0);


  attempt++;
  playerMesh.position.y = 0;
  const attemptElement = document.getElementById('notif');
  attemptElement.textContent = `Attempt: ${attempt}`;
  attemptElement.classList.add('fade-in-out');
  document.body.appendChild(attemptElement);
  setTimeout(() => {
    attemptElement.classList.remove('fade');
    attemptElement.textContent = '';
  }, 3000);
  

audio = new Audio('./resources/tnex.mp3'); audio.volume=0.06; audio.currentTime=0;
if(difficulty==4){audio = new Audio('./resources/Xtrullor-Tria.mp3'); audio.volume=0.01; audio.currentTime=0;}


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
audio.addEventListener('ended', () => {
  if(start){showEndingScreen();console.log('GG, Thanks for playing!');}  
});
onStart();
start=true
speed=0.05;
}

function gameStartOne() {
  difficulty = 1;
  gameStart();
}

function gameStartTwo() {
  difficulty = 2;
  gameStart();
}

function gameStartThree() {
  difficulty = 3;
  gameStart();
}

function gameStartFour() {
  difficulty = 4;
  gameStart();
}

const button1 = document.querySelector('#start1');
button1.addEventListener('click', gameStartOne);

const button2 = document.querySelector('#start2');
button2.addEventListener('click', gameStartTwo);

const button3 = document.querySelector('#start3');
button3.addEventListener('click', gameStartThree);

const button4 = document.querySelector('#start4');
button4.addEventListener('click', gameStartFour);


document.addEventListener("fullscreenchange", function () {
  if (document.fullscreenElement) {
    location.reload();
  } else {
    location.reload();
  }
});


let escapeKeyDown = false;
const pauseOverlay = document.getElementById("pause-overlay");
const pauseMenu = pauseOverlay.querySelector(".pause-menu");
const pauseS = new Audio('./resources/pause.wav'); pauseS.volume = 0.05;
function pauseOn() {
  notify('Game currently paused')
  pauseS.currentTime=0;
  pauseS.play();
  pause=true
  pauseOverlay.style.display = "flex";
  setTimeout(() => pauseMenu.classList.add("show"), 50);
  audio.pause(); 
}


function pauseOff() {
  pause=false
  pauseMenu.classList.remove("show");
  setTimeout(() => pauseOverlay.style.display = "none", 50);
  audio.play();
}

function reloadPage(){location.reload()}
const resume = document.querySelector('#resume');
resume.addEventListener('click', pauseOff);
const re = document.querySelector('#restart');
re.addEventListener('click', restart);
const reload = document.querySelector('#reloadPage');
reload.addEventListener('click', reloadPage);


document.addEventListener('keydown', function(event) {
  if (event.code === 'Escape' && !escapeKeyDown) {
    escapeKeyDown = true;
    pause = !pause;
    if(pause && start){pauseOn(); }
    if(start && !pause){pauseOff();  }
  }
});

const endingScreen = document.querySelector('.ending-screen');
endingScreen.style.display = 'none';

function showEndingScreen() {
  endingScreen.style.display = 'flex';
  endingScreen.style.animation = 'fade-in 1s ease-in-out forwards';
}






document.addEventListener('keyup', function(event) {
  if (event.code === 'Escape') {
    escapeKeyDown = false;
  }
});
