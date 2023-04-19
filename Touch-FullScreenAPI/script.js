const video = document.getElementById('video1');
let fullScreen = false;
let lastTap = 0;
let tapCount = 0;
let startStopTimer;
let touchMoved = false; // variable para verificar si se movió el dedo

function playOrPause() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function jumpAhead() {
  video.currentTime += 10;
}

function jumpBack() {
  video.currentTime -= 10;
}

function toggleFullScreen() {
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

document.addEventListener('touchstart', (event) => {
  const currentTime = new Date().getTime();

  if (event.touches.length === 1) {
    // Single tap
    if (currentTime - lastTap < 250) {
      // Double tap
      tapCount++;

      if (tapCount === 2) {
        tapCount = 0;

        const x = event.touches[0].pageX;
        const width = window.innerWidth;
        const third = width / 3;

        if (x > 2 * third) {
          jumpAhead();
        } else if (x > third) {
          toggleFullScreen();
        } else {
          jumpBack();
        }

        //reiniciamos el temporizador si hay un doble toque
        clearTimeout(startStopTimer)
      }
    } else {
      touchMoved = false; // reiniciar variable
      tapCount = 1;
      lastTap = currentTime;
      startStopTimer = setTimeout(() => {
        if (tapCount === 1 && !touchMoved) { // verificar si no se movió el dedo
          playOrPause();
        }
      }, 250);
    }
  }
});

document.addEventListener('touchmove', (event) => {
  touchMoved = true; // marcar que se movió el dedo
  const y = event.touches[0].pageY;
  const height = window.innerHeight;
  const onePercent = height / 100;
  const volume = Math.round((y / onePercent)); // calcular el volumen basado en la posición del dedo

  if (volume <= 0) { 
    console.log(volume);
    video.volume = 1;
  } else if (volume >= 100) {
    console.log(volume);
    video.volume = 0;
  } else {
    console.log(100 - volume);
    video.volume = (100 - volume) / 100;
  }
});

