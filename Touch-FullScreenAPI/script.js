const video = document.getElementById('video1');
let fullScreen = false;
let lastTap = 0;
let tapCount = 0;

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
      }
    } else {
      tapCount = 1;
      lastTap = currentTime;
      playOrPause();
    }
  }
});
