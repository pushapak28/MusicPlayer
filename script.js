const image = document.querySelector('img');
const title = document.getElementById('title');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const preBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music 
const songs = [{
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Chill/Jacinto',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army',
        artist: 'Army/Jacinto',
    },
    {
        name: 'jacinto-3',
        displayName: 'Reggae Fusion',
        artist: 'Reggage/Jacinto',
    },

    {
        name: 'metric-1',
        displayName: 'Front Row',
        artist: 'Metric/Jacinto',
    },
    {
        name: 'pushpak-1',
        displayName: 'Bumper Boom',
        artist: 'Boom/MR.Creater',
    },
    {
        name: 'pushpak-2',
        displayName: 'Zindagi',
        artist: 'Zindagi/MR.Creater',
    },
    {
        name: 'pushpak-3',
        displayName: 'Tu Hai Ke Nahi',
        artist: 'Roy/MR.Creater',
    },
];
// check if playing
let isPlaying = false;
//  Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}
// pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('Pause', 'title');

    music.pause();
}
// event play or pause 
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// current song
let songIndex = 0;

// prev song 
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}
// next song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}


// on load select first
loadSong(songs[songIndex]);

// update progress bar $ time
function updateProgressBar(e) {
    if (isPlaying) {
        const {
            duration,
            currentTime
        } = e.srcElement;
        console.log(duration, currentTime);
        // update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        console.log('minutes', durationMinutes);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        console.log('seconds', durationSeconds);

        // Delay Switching duration Elelment to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for current time
        const currentMinutes = Math.floor(currentTime / 60);
        console.log('minutes', currentMinutes);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        console.log('seconds', currentSeconds);
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

    }
}
// set progress bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {
        duration
    } = music;
    music.currentTime = (clickX / width) * duration;
}
// event listeners
preBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong());
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
