//zindex is mostly more than 1,000 for this js file
document.getElementById('notif').style.top=String(window.innerHeight*36/100)+'px'; 
document.getElementById('notif').style.bottom=String(window.innerHeight*24/100)+'px';
document.getElementById('notif').style.left=String(window.innerWidth*0/100)+'px'; 
document.getElementById('notif').style.right=String(window.innerWidth*0/100)+'px';

function startDisplay() {
    const elements = document.querySelectorAll('.tst');
    elements.forEach(element => {
      element.style.display = 'block';
    });
  }
  