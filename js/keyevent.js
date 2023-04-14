//this is a very standard keyevent file, nothing much really.
// if you are viewing this code as an outsider, some keys are redundant cause its copied from super circles project i made a while ago, its been like this since.

const keys = {
  a: { pressed: false },
  s: { pressed: false },
  d: { pressed: false },
  w: { pressed: false },
  z: { pressed: false },
  x: { pressed: false },
  c: { pressed: false },
  shi: {pressed: false},
  aLeft: { pressed: false },
  aRight: { pressed: false },
  aUp: { pressed: false },
  aDown: { pressed: false },
};

document.addEventListener("keydown", ({key}) => {
 switch (key) {
   case "a":
     keys.a.pressed = true;
     break;
   case "d":
     keys.d.pressed = true;
     break;
   case "z":
     keys.z.pressed = true;
     break;
   case "Z":
     keys.z.pressed = true;
     break;
   case "w":
     keys.w.pressed = true;
     break;
   case "s":
     keys.s.pressed = true;
     break;
   case "x":
     keys.x.pressed = true;
     break;
    case "c":
      keys.c.pressed = true;
      break;
   case "Shift":
     keys.shi.pressed = true;
     break;
   case "ArrowUp":
     keys.aUp.pressed = true;
     break;
   case "ArrowDown":
     keys.aDown.pressed = true;
     break;
   case "ArrowLeft":
     keys.aLeft.pressed = true;
     break;
   case "ArrowRight":
     keys.aRight.pressed = true;
     break;
   case "6":
     location.reload();
 }
});

document.addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
    case "z":
      keys.z.pressed = false;
      break;
    case "Z":
      keys.z.pressed = false;
      break;
    case "w":
      keys.w.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "x":
      keys.x.pressed = false;
      break;
      case "c":
      keys.c.pressed = false;
      break;
    case "Shift":
      keys.shi.pressed = false;
      break;
    case "ArrowUp":
      keys.aUp.pressed = false;
      break;
    case "ArrowDown":
      keys.aDown.pressed = false;
      break;
    case "ArrowLeft":
      keys.aLeft.pressed = false;
      break;
    case "ArrowRight":
      keys.aRight.pressed = false;
      break;
  }
});

