console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('assest/hollywood/h1.mp3');
let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');
let songitems = Array.from(document.getElementsByClassName('songitem'));

let songs = [
    { songName: "lily-Emelie Hollow", filepath: "assest/hollywood/h1.mp3", coverpath: "assest/hollywood/songcover1.jpeg" },
    { songName: "Glass Animals-H.W.", filepath: "assest/hollywood/h2.mp3", coverpath: "assest/hollywood/songcover2.jpeg" },
    { songName: "Doremon (fav.)", filepath: "assest/hollywood/h3.mp3", coverpath: "assest/hollywood/songcover3.jpeg" },
    { songName: "Believer", filepath: "assest/hollywood/h4.mp3", coverpath: "assest/hollywood/songcover4.jpeg" },
    { songName: "Ride It-Jay Sean", filepath: "assest/hollywood/h5.mp3", coverpath: "assest/hollywood/songcover5.jpeg" },
    { songName: "Lauv Steal The Show", filepath: "assest/hollywood/h6.mp3", coverpath: "assest/hollywood/songcover6.jpeg" },
    { songName: "Dandelions-Ruth B", filepath: "assest/hollywood/h7.mp3", coverpath: "assest/hollywood/songcover7.jpeg" },
    { songName: "A Thousand Years", filepath: "assest/hollywood/h8.mp3", coverpath: "assest/hollywood/songcover8.jpeg" },
    { songName: "One Direction", filepath: "assest/hollywood/h9.mp3", coverpath: "assest/hollywood/songcover9.jpeg" },
    { songName: "Coldplay", filepath: "assest/hollywood/h10.mp3", coverpath: "assest/hollywood/songcover10.jpg" },
];

songitems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterplay.classList.remove('fa-pause');
        masterplay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    // Update seekbar
    let progress = parseFloat((audioElement.currentTime / audioElement.duration) * 100);
    myprogressbar.value = progress;
});

myprogressbar.addEventListener('change', () => {
    audioElement.currentTime = (myprogressbar.value * audioElement.duration) / 100;
});

// Make all play buttons show play icon
function makeAllPlays() {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    });
}

// Handle song item play button click
Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = `assest/hollywood/h${songIndex}.mp3`;
        mastersongname.innerText = songs[songIndex-1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
    });
});

// Handle next button click
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `assest/hollywood/h${songIndex + 1}.mp3`;
    mastersongname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
});

// Handle previous button click
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `assest/hollywood/h${songIndex + 1}.mp3`;
    mastersongname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
});

// Handle song end and play the next song
audioElement.addEventListener('ended', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `assest/hollywood/h${songIndex + 1}.mp3`;
    mastersongname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
});
