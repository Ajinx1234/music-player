let audiolistener = new Audio('songs/1.mp3');
let songindex = 0;
let masterplay = document.getElementById("masterplay");
let secretElements = document.getElementsByClassName('secret');
let myprogressbar = document.getElementById("progressbar");
let backgroundGif = document.getElementById("backgroundGif");

// Define an array of songs with their names and file paths
let songs = [
  { songname: "Raatan Lambiyan", filepath: "songs/1.mp3" },
  { songname: "Jawan Title Track", filepath: "songs/2.mp3" },
  { songname: "kesariya", filepath: "songs/3.mp3" },
  { songname: "Deva Deva", filepath: "songs/4.mp3" },
  { songname: "Hai APna Dil To Awara ", filepath: "songs/5.mp3" },
  { songname: "Pyar Deewana Hota Hai", filepath: "songs/6.mp3" },
  { songname: "Mere Samne Wali Khidki", filepath: "songs/7.mp3" },
  { songname: "Yeh Vaada Raha", filepath: "songs/8.mp3" },
  { songname: "Chala Jata Hoon ", filepath: "songs/9.mp3" },
  { songname: "Dope Shope ", filepath: "songs/10.mp3" },
  { songname: "Blue Eyes", filepath: "songs/11.mp3" },
  { songname: " Desi Kalakar", filepath: "songs/12.mp3" },
  { songname: " Kuley Kuley", filepath: "songs/13.mp3" },
  { songname: "Kalaastar", filepath: "songs/14.mp3" },
  { songname: "Brown Rang", filepath: "songs/15.mp3" },
  { songname: " Rap God", filepath: "songs/16.mp3" },
  { songname: "  Eminem - Without Me", filepath: "songs/17.mp3" },
  { songname: "  Godzilla", filepath: "songs/18.mp3" },
  { songname: "The Real Slim Shady", filepath: "songs/19.mp3" },
  { songname: "Eminem - Superman", filepath: "songs/20.mp3" },
  // Add more songs with their file paths here
];

// ...
// Your existing code
// ...

// Function to play the selected song
function playSong() {
  if (audiolistener.paused || audiolistener.currentTime <= 0) {
    // Start playing the audio
    audiolistener.play();
    // Start playing the video
    backgroundGif.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
  } else {
    // Pause the audio
    audiolistener.pause();
    // Pause the video
    backgroundGif.pause();
    masterplay.classList.add('fa-play-circle');
    masterplay.classList.remove('fa-pause-circle');
  }
}

// Function to play the next song
function playNextSong() {
  songindex = (songindex + 1) % songs.length;
  audiolistener.src = songs[songindex].filepath;
  playSong();
}

// Function to play the previous song
function playPreviousSong() {
  songindex = (songindex - 1 + songs.length) % songs.length;
  audiolistener.src = songs[songindex].filepath;
  playSong();
}

// Event listener for the play button
masterplay.addEventListener('click', playSong);

// Event listener for the forward song button
document.querySelector('.fa-step-forward').addEventListener('click', playNextSong);

// Event listener for the backward song button
document.querySelector('.fa-step-backward').addEventListener('click', playPreviousSong);

// Add click event listeners to the "secret" elements
// Add click event listeners to the "secret" elements
for (let secret of secretElements) {
  secret.addEventListener('click', function () {
    let songIndex = Array.from(secretElements).indexOf(this);
    songindex = songIndex; // Update the current song index
    audiolistener.src = songs[songIndex].filepath; // Use songs[songIndex] instead of selectedSong
    playSong();
  });
}

// ...
// Your existing code for progress bar
// ...



// ...

audiolistener.addEventListener('timeupdate', ()=>{ 
  // Update Seekbar
  progress = parseInt((audiolistener.currentTime/audiolistener.duration)* 100); 
  myprogressbar.value = progress;
})

myprogressbar.addEventListener('change', ()=>{
  audiolistener.currentTime = myprogressbar.value * audiolistener.duration/100;
})
// ...
