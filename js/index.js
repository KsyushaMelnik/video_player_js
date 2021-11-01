const $video = document.querySelector('#video'),
      $videoPlayer = document.querySelector('.video__player'),
      $upload = document.querySelector('#upload'),
      $playBtn = document.querySelector('.controls__play'),
      $stopBtn = document.querySelector('.controls__stop'),
      $playBtnImg = document.querySelector('.play__btn'),
      $progress = document.querySelector('.progress'),
      $time = document.querySelector('.controls__time')

function handleFiles(event) {
    var files = event.target.files;
    $video.setAttribute("src", URL.createObjectURL(files[0]));
    $video.load();
}
$upload.addEventListener("change", handleFiles, false);

//Play & Pause video
function toggleVideoStatus() {
    if($video.paused) {
        $video.play();
        $playBtnImg.src = './img/pause.png'
    } else {
        $video.pause();
        $playBtnImg.src = './img/play.png'
    }
}
$playBtn.addEventListener('click', toggleVideoStatus);
$video.addEventListener('click', toggleVideoStatus);

//Stop video
function stopVideo() {
    $video.currentTime = 0;
    $video.pause();
    $playBtnImg.src = './img/play.png'
}
$stopBtn.addEventListener('click',stopVideo);

//Timer
function updateProgress() {
    $progress.value = ($video.currentTime / $video.duration) * 100;
    
    //time
    let minutes = Math.floor($video.currentTime / 60);
    if(minutes < 10) {
        minutes = '0' + String(minutes);
    }
    let seconds = Math.floor($video.currentTime % 60);
    if(seconds < 10) {
        seconds = '0' + String(seconds);
    }
    $time.innerHTML = `${minutes}:${seconds}`;
}
$video.addEventListener('timeupdate', updateProgress);

// Set progress
function setProgress() {
    $video.currentTime = ($progress.value * $video.duration) / 100;
}
$progress.addEventListener('change', setProgress);