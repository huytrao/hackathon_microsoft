document.addEventListener('DOMContentLoaded', function () {
  var videos = document.querySelectorAll('video');

  videos.forEach(function (video) {
    video.addEventListener('loadedmetadata', function () {
      resizeVideo(video);
    });
  });

  window.addEventListener('resize', function () {
    var currentVideo = document.querySelector('video[style="display: block;"]');
    if (currentVideo) {
      resizeVideo(currentVideo);
    }
  });

  function getNextVideoId(currentVideoId) {
    var currentNumber = parseInt(currentVideoId.match(/\d+/)[0]);
    var nextNumber = currentNumber + 1;
    return currentVideoId.replace(/\d+/, nextNumber);
  }

  function resizeVideo(video) {
    var aspectRatio = video.videoWidth / video.videoHeight;
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    var screenAspectRatio = screenWidth / screenHeight;

    if (screenAspectRatio > aspectRatio) {
      video.style.width = '100%';
      video.style.height = 'auto';
    } else {
      video.style.width = 'auto';
      video.style.height = '100%';
    }
  }

  function playVideo(videoId) {
    var videoContainer = document.getElementById('video-container');
    var video = document.getElementById(videoId);

    if (!video) {
      console.error("Video with ID " + videoId + " not found.");
      return;
    }

    videos.forEach(function (v) {
      v.style.display = 'none';
    });

    video.style.display = 'block';

    // Check if the video is being played due to the "Hacker" button
    if (videoContainer.classList.contains('fullscreen')) {
      videoContainer.style.width = '100%';
      videoContainer.style.height = '100%';
      document.documentElement.requestFullscreen(); // Request full screen
    }

    video.addEventListener('ended', function () {
      var nextVideoId = getNextVideoId(videoId);
      var nextVideo = document.getElementById(nextVideoId);

      if (nextVideo) {
        playVideo(nextVideoId);
      } else {
        console.log('All videos have been played.');
      }
    });

    video.play();
  }

  // Listen for the click event on the "Hacker" button and enable fullscreen
  document.getElementById('play-fullscreen-button').addEventListener('click', function () {
    var videoContainer = document.getElementById('video-container');
    videoContainer.classList.add('fullscreen');
    playVideo("1");
  });
});
