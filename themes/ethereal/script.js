const player = {
    isPlaying: false,
    currentTrack: 0,
    volume: 70,
    playlist: [
        { title: 'Ethereal Dreams', artist: 'Dreamer' },
        { title: 'Starlight', artist: 'Cosmic Waves' },
        { title: 'Pink Flowers', artist: 'Garden Vibes' },
        { title: 'Midnight Sky', artist: 'Night Wanderer' }
    ]
};

const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const volumeSlider = document.getElementById('volumeSlider');
const volumeValue = document.getElementById('volumeValue');
const songTitle = document.getElementById('songTitle');
const artistName = document.getElementById('artistName');
const albumArt = document.getElementById('albumArt');

document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
    setupEventListeners();
});

function setupEventListeners() {
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', previousTrack);
    nextBtn.addEventListener('click', nextTrack);
    volumeSlider.addEventListener('input', changeVolume);
}

function togglePlay() {
    player.isPlaying = !player.isPlaying;
    updatePlayButton();
}

function updatePlayButton() {
    if (player.isPlaying) {
        playBtn.textContent = '⏸️ Pause';
    } else {
        playBtn.textContent = '▶️ Play';
    }
}

function nextTrack() {
    player.currentTrack = (player.currentTrack + 1) % player.playlist.length;
    updateDisplay();
    player.isPlaying = true;
    updatePlayButton();
}

function previousTrack() {
    player.currentTrack = (player.currentTrack - 1 + player.playlist.length) % player.playlist.length;
    updateDisplay();
    player.isPlaying = true;
    updatePlayButton();
}

function changeVolume(e) {
    player.volume = e.target.value;
    volumeValue.textContent = player.volume + '%';
}

function updateDisplay() {
    const track = player.playlist[player.currentTrack];
    songTitle.textContent = track.title;
    artistName.textContent = track.artist;
    const albumIndex = (player.currentTrack % 4) + 1;
    albumArt.src = `images/album-art/album${albumIndex}.png`;
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
    if (e.code === 'ArrowRight') nextTrack();
    if (e.code === 'ArrowLeft') previousTrack();
    if (e.code === 'ArrowUp') volumeSlider.value = Math.min(100, player.volume + 10);
    if (e.code === 'ArrowDown') volumeSlider.value = Math.max(0, player.volume - 10);
    changeVolume({ target: volumeSlider });
});

console.log('🎵 Hg+ Media Player loaded!');
