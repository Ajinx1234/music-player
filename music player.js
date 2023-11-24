let audiolistener = new Audio('songs/1.mp3');
let songindex = 0;
let masterplay = document.getElementById("masterplay");
let secretElements = document.getElementsByClassName('secret');
let myprogressbar = document.getElementById("progressbar");
let backgroundGif = document.getElementById("backgroundGif");
let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

// Define an array of songs with their names and file paths
let songs = [
{ songname: "rata lambiya", filepath: "songs/1.mp3" },
  { songname: "jawan Title Track", filepath: "songs/2.mp3" },
  { songname: "kesariya", filepath: "songs/3.mp3" },
  { songname: "Deva Deva", filepath: "songs/4.mp3" },
  { songname: "hai APna Dil To Awara", filepath: "songs/5.mp3" },
  { songname: "pyar deewana hota hai", filepath: "songs/6.mp3" },
  { songname: "mere samne wali khidki", filepath: "songs/7.mp3" },
  { songname: "yeh vaada raha", filepath: "songs/8.mp3" },
  { songname: "chala jata hoon", filepath: "songs/9.mp3" },
  { songname: "dope shope", filepath: "songs/10.mp3" },
  { songname: "blue Eyes", filepath: "songs/11.mp3" },
  { songname: "desi kalakaar", filepath: "songs/12.mp3" },
  { songname: "kule kule", filepath: "songs/13.mp3" },
  { songname: "kalaastar", filepath: "songs/14.mp3" },
  { songname: "brown Rang", filepath: "songs/15.mp3" },
  { songname: "rap god", filepath: "songs/16.mp3" },
  { songname: "without me", filepath: "songs/17.mp3" },
  { songname: "godzilla", filepath: "songs/18.mp3" },
  { songname: "slim shady", filepath: "songs/19.mp3" },
  { songname: "superman", filepath: "songs/20.mp3" },
  { songname: "pal pal", filepath: "songs/21.mp3" },
  { songname: "mere mehboob", filepath: "songs/22.mp3" },
  { songname: "tum se hi", filepath: "songs/23.mp3" },
  { songname: "ilahi", filepath: "songs/24.mp3" },
  { songname: "tera hone lag hoon", filepath: "songs/25.mp3" },
  { songname: "the dictator theme", filepath: "songs/26.mp3" },
  { songname: "imperial japanese march", filepath: "songs/27.mp3" },
  { songname: "soviet anthem", filepath: "songs/28.mp3" },
  { songname: "mera joota hai japani", filepath: "songs/29.mp3" },
  { songname: "bohemian rhapsody", filepath: "songs/30.mp3" },
  { songname: "senorita", filepath: "songs/31.mp3" },
  { songname: "mockingbird", filepath: "songs/32.mp3" },
  { songname: "breathless", filepath: "songs/33.mp3" },
  { songname: "tumhe jo maine dekha", filepath: "songs/34.mp3" },
  { songname: "jaikal mahakal", filepath: "songs/35.mp3" },
];

// Function to play the selected song
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

// Event listener for the "ended" event of the audio
audiolistener.addEventListener('ended', playNextSong);

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
for (let secret of secretElements) {
  secret.addEventListener('click', function () {
    let songIndex = Array.from(secretElements).indexOf(this);
    songindex = songIndex; // Update the current song index
    audiolistener.src = songs[songIndex].filepath; // Use songs[songIndex] instead of selectedSong
    playSong();
  });
}
function pauseSong() {
  audiolistener.pause(); // Pause the audio
  backgroundGif.pause(); // Pause the video
  masterplay.classList.add('fa-play-circle'); // Update the play button icon
  masterplay.classList.remove('fa-pause-circle');
}
// Function to play the next song



// Update Seekbar
audiolistener.addEventListener('timeupdate', () => {
  progress = parseInt((audiolistener.currentTime / audiolistener.duration) * 100);
  myprogressbar.value = progress;
});

myprogressbar.addEventListener('change', () => {
  audiolistener.currentTime = myprogressbar.value * audiolistener.duration / 100;
});

// Add a button to start speech recognition
document.getElementById("startRecognitionButton").addEventListener('click', () => {
  recognition.start();
});


// Define voice commands and actions
recognition.onresult = (event) => {
  const command = event.results[0][0].transcript.toLowerCase();
  console.log('Recognized command:', command);

  // Extract the song name from the recognized command
  if (command.startsWith("play")) {
    const songToPlay = command.substring(5).trim(); // Remove "play" from the command and trim any leading/trailing spaces
    console.log('Song to play:', songToPlay);

    // Find the song in the songs array based on the song name
    const selectedSong = songs.find(song => song.songname.toLowerCase() === songToPlay);
    console.log('Selected song:', selectedSong);

    if (selectedSong) {
      // Set the audio source to the selected song and play it
      audiolistener.src = selectedSong.filepath;
      playSong();
    } else {
      console.log(`Song "${songToPlay}" not found.`);
    }
  } else if (command === "stop") {
    pauseSong();
  }

  // Add more voice commands and corresponding actions as needed
};


recognition.onstart = () => {
  
};

recognition.onerror = (event) => {
  // Handle recognition errors
  console.error('Speech recognition error:', event.error);
};

recognition.onend = () => {
  // Recognition has ended
  console.log('Speech recognition ended');
};
// Add a keydown event listener to the document
document.addEventListener('keydown', (event) => {
  // Check if the pressed key is the spacebar (key code 32)
  if (event.keyCode === 32) {
    // Trigger a click event on the startRecognitionButton
    document.getElementById("startRecognitionButton").click();
    event.preventDefault(); // Prevent the default spacebar behavior (scrolling the page)
  }
});


