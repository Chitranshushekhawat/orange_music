console.log("Welcome to spotify");
let songIndex=0;
let audioElement = new Audio('assest/1.mp3');
let masterplay=document.getElementById('masterplay')
let myprogressbar=document.getElementById('myprogressbar')
let gif=document.getElementById('gif')
let mastersongname=document.getElementById('mastersongname')
let songitems = Array.from(document.getElementsByClassName('songitem'));

let songs=[
    {songName:"Sajni | Laapataa Ladies ",filepath:"assest/1.mp3",coverpath:"assest/songcover1.jpg"},
    {songName:"Tum Hi Ho | Aashiqui 2",filepath:"assest/2.mp3",coverpath:"assest/songcover2.jpeg"},
    {songName:"Raabta (Album)",filepath:"assest/3.mp3",coverpath:"assest/songcover3.jpg"},
    {songName:"Tum Se Hi | Sadak 2",filepath:"assest/4.mp3",coverpath:"assest/songcover4.jpg"},
    {songName:"Tera Ban Jaunga",filepath:"assest/5.mp3",coverpath:"assest/songcover5.jpg"},
    {songName:"Tera Hone Laga Hoon",filepath:"assest/6.mp3",coverpath:"assest/songcover6.jpg"},
    {songName:"Tum Jo Aaye",filepath:"assest/7.mp3",coverpath:"assest/songcover7.jpg"},
    {songName:"Tum Se Hi | Jab we met",filepath:"assest/8.mp3",coverpath:"assest/songcover8.jpg"},
    {songName:"Tera Zikr (Album)",filepath:"assest/9.mp3",coverpath:"assest/songcover9.jpg"},
    {songName:"Chahun Main Ya Naa",filepath:"assest/10.mp3",coverpath:"assest/songcover10.jpg"},
]
songitems.forEach((Element,i)=>{
    Element.getElementsByTagName("img")[0].src=songs[i].coverpath;
    Element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})
// audioElement.play();
//handle play pause
masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
      audioElement.play();
      masterplay.classList.remove('fa-play');
      masterplay.classList.add('fa-pause');
      gif.style.opacity=1;
    }
    else {audioElement.pause();
    masterplay.classList.remove('fa-pause');
    masterplay.classList.add('fa-play');
    gif.style.opacity=0;}

    })
//listen to events
audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
    progress=parseFloat((audioElement.currentTime/audioElement.duration)*100);
    myprogressbar.value=progress;
})
myprogressbar.addEventListener('change',()=>{
    audioElement.currentTime=(myprogressbar.value*audioElement.duration)/100;
})
makeAllplays=()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((Element)=>{
        Element.classList.remove('fa-pause');
        Element.classList.add('fa-play');
    })
}
Array.from(document.getElementsByClassName('songitemplay')).forEach((Element)=>{
    Element.addEventListener('click',(e)=>{
        makeAllplays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src=`assest/${songIndex}.mp3`;
        mastersongname.innerText = songs[songIndex-1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=0
    }
    else{
    songIndex +=1 ;
    }
    audioElement.src=`assest/${songIndex+1}.mp3`;
    mastersongname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0
    }
    else{
    songIndex -=1 ;
    }
    audioElement.src = `assest/${songIndex+1}.mp3`;
    mastersongname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
})

audioElement.addEventListener('ended', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `assest/${songIndex + 1}.mp3`;
    mastersongname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
});

