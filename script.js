let progressBar = document.getElementById('progress-bar');
let song = document.getElementById('som');
let playControl = document.getElementById('play');
let songTitle = document.getElementById('song-title');
let artistName = document.getElementById('artist-name');
let coverImage = document.getElementById('cover-image');
let audioSource = document.getElementById('audio-source');
let currentSongIndex = 0;

// Lista de músicas
const songs = [
    {
        title: "In the End",
        artist: "Linkin Park",
        src: "./songs/inTheEnd.mp3",
        cover: "./assets/linkin-park.jpg"
    },
    {
        title: "Numb",
        artist: "Linkin Park",
        src: "./songs/numb.mp3",
        cover: "./assets/linkin-park2.jpg"
    },
    {
        title: "Breaking the Habit",
        artist: "Linkin Park",
        src: "./songs/crawling.mp3",
        cover: "./assets/linkin-park.jpg"
    }
];



// Carrega a música atual
function loadSong(songIndex) {
    songTitle.textContent = songs[songIndex].title;
    artistName.textContent = songs[songIndex].artist;
    coverImage.src = songs[songIndex].cover;
    audioSource.src = songs[songIndex].src;
    song.load();
}

song.onloadedmetadata = function() {
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
}

function playPause() {
    if(playControl.classList.contains("bi-pause-circle-fill")) {
        song.pause();
        playControl.classList.remove("bi-pause-circle-fill");
        playControl.classList.add("bi-play-circle-fill");
    } else {
        song.play();
        playControl.classList.remove("bi-play-circle-fill");
        playControl.classList.add("bi-pause-circle-fill");
    }
}

song.addEventListener('timeupdate', () => {
    progressBar.value = Math.min(song.currentTime, song.duration);
});

progressBar.onchange = function(){
    song.play();
    song.currentTime = progressBar.value;
    playControl.classList.remove("bi-play-circle-fill");
    playControl.classList.add("bi-pause-circle-fill");

}

// Função para avançar para a próxima música
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    console.log('Next Song Index:', currentSongIndex);  // Adicione esta linha
    loadSong(currentSongIndex);
    song.play();
    playControl.classList.remove("bi-play-circle-fill");
    playControl.classList.add("bi-pause-circle-fill");
}

// Função para voltar para a música anterior
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    console.log('Prev Song Index:', currentSongIndex);  // Adicione esta linha
    loadSong(currentSongIndex);
    song.play();
    playControl.classList.remove("bi-play-circle-fill");
    playControl.classList.add("bi-pause-circle-fill");
}

loadSong(currentSongIndex);