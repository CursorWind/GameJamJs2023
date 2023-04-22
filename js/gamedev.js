document.getElementById('controlpanel').style.display='none';
document.getElementById('LagDealer').style.display='none';

function exitButton(){
     if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }
      window.close('','_parent','');
}

const notifier = document.getElementById('notification')
notifier.style.left = String(window.innerWidth/2-180) + 'px'

function notify(msg){
    notifier.innerHTML = msg;
    notifier.style.top = '0px';
    setTimeout(function(){notifier.style.top = '-64px'},3200)
}

var cov = document.getElementById("ambience");
setTimeout(function() {
  cov.style.transition = "opacity 1.2s";
  cov.style.opacity = 0.0;

  cov.style.zIndex = 11;
}, 0);