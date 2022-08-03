const playButton = document.getElementById("play");
const audio = document.getElementById("audio");
const musicContainer = document.getElementById("music-container");

const title = document.getElementById("title");
const cover = document.getElementById("cover");

const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

// Song titles
const songs = ["hey", "summer", "ukulele"];

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = title.innerText = `${songIndex + 1}` + " " + song;

  audio.src = `/src/music/${song}.mp3`;
  cover.src = `/src/images/${song}.jpg`;
}

// play Song
function playSong() {
  musicContainer.classList.add("play");
  playButton.querySelector("i.fas").classList.remove("fa-play");
  playButton.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}
// pause Song
function pauseSong() {
  musicContainer.classList.remove("play");
  playButton.querySelector("i.fas").classList.add("fa-play");
  playButton.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
}

// play Prev song
function playPrevSong() {
  songIndex = songIndex - 1;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// play next song
function playNextSong() {
  songIndex = songIndex + 1;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Update Progress
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  // console.log(duration, currentTime);
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}
// // set Progress
function setProgress(e) {
  const width = this.clientWidth;
  const clientX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clientX / width) * duration;
}

// Event Listeners
playButton.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// next Button Event Listener
nextButton.addEventListener("click", playNextSong);

// Prev Button Event Listener
prevButton.addEventListener("click", playPrevSong);

audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", playNextSong);
