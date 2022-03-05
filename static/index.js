
let songList = [
    { songName: 'DarkSide', filePath: '../static/Songs/DarkSide.mp3', cast: 'DarkSide - Alan Walker, Tomine Harket', cover: '../static/coverPics/cover1.jpeg' },
    { songName: 'Faded', filePath: '../static/Songs/Faded.mp3', cast: 'Faded - Alan Walker, Iselin Løken Solheim ', cover: '../static/coverPics/cover 2.jpeg' },
    { songName: 'Lily', filePath: '../static/Songs/Lily.mp3', cast: 'Lily - Alan Walker, Emelie Holow', cover: '../static/coverPics/cover 3.jpeg' },
    { songName: 'Spectre', filePath: '../static/Songs/Spectre.mp3', cast: 'Spectre - Alan Walker, Jesper Borgen', cover: '../static/coverPics/cover 4.jpeg' },
    { songName: 'on my way', filePath: '../static/Songs/onmyway.mp3', cast: 'On my way - Alan Walker, Sabrina Carpenter & Farruko', cover: '../static/coverPics/cover 5.jpeg' },
    { songName: 'Alone', filePath: '../static/Songs/Alone.mp3', cast: 'Alone - Alan Walker, Noonie Bao', cover: '../static/coverPics/cover 6.jpeg' },
    { songName: 'Kings and Queens', filePath: '../static/Songs/Kings and Queens.mp3', cast: 'Kings & Queens - Ava Max', cover: '../static/coverPics/cover 7.jpeg' },
    { songName: 'Christmas without you', filePath: '../static/Songs/Christmas.mp3', cast: 'Christmas without you - Ava Max', cover: '../static/coverPics/cover 8.jpeg' },
    { songName: 'Sweet but psycho', filePath: '../static/Songs/Sweet but psycho.mp3', cast: 'Sweet but psycho - Ava Max', cover: '../static/coverPics/cover 9.jpeg' },
    { songName: 'Into your arms', filePath: '../static/Songs/Into your arms.mp3', cast: 'Into your arms - Ava Max, Witt Lowry', cover: '../static/coverPics/cover 10.jpeg' },
    { songName: 'Alone Pt-II', filePath: '../static/Songs/Alone Pt-II.mp3', cast: 'Alone Pt. II - Ava Max, Alan Walker', cover: '../static/coverPics/cover 11.jpeg' }
];

let songIndex = 0;
let audioElement = new Audio('../static/Songs/DarkSide.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let next = document.getElementById('next');
let previous = document.getElementById('previous');
let timeStamp = document.getElementById('timeStamp');
let container = document.getElementsByClassName('container')[0];
let searchArtist = document.getElementById('searchArtist');
let searchSong = document.getElementById('searchSong');

function secondsToMMSS() {

    seconds = Math.ceil(audioElement.currentTime);

    let minutes = Math.floor(seconds/60);
    let second =  Math.floor(seconds-(minutes*60));

    let result = minutes + ":" + (second<10? "0" + second:second);

    return result;
}


masterPlay.addEventListener('click', () => {

    if (audioElement.paused || audioElement.currentTime == 0) {

        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        document.querySelectorAll('.songPlay')[songIndex].classList.remove('fa-play-circle');
        document.querySelectorAll('.songPlay')[songIndex].classList.add('fa-pause-circle');
        gif.getElementsByTagName('p')[0].innerText = `${songList[songIndex].cast}`;
        gif.style.opacity = 1;
        document.querySelectorAll('.songItem')[songIndex].style.backgroundColor = 'green';
        container.style.backgroundImage = `url('${songList[songIndex].cover}')`;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        document.querySelectorAll('.songPlay')[songIndex].classList.remove('fa-pause-circle');
        document.querySelectorAll('.songPlay')[songIndex].classList.add('fa-play-circle');
        gif.style.opacity = 0;
        document.querySelectorAll('.songItem')[songIndex].style.backgroundColor = 'white';
        container.style.backgroundImage = "url('../static/coverPics/bg.jpg')";
    }
});

audioElement.addEventListener('timeupdate', () => {

    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);

    progressBar.value = progress;

    if (audioElement.currentTime == audioElement.duration) {

        let index = songIndex;

        if (songIndex >= 10) {
            songIndex = 0;
        }
        else {
            songIndex++;
        }

        audioElement.currentTime = 0;
        audioElement.src = songList[songIndex].filePath;
        audioElement.play();

        document.querySelectorAll('.songPlay')[index].classList.remove('fa-pause-circle');
        document.querySelectorAll('.songPlay')[index].classList.add('fa-play-circle');
        document.querySelectorAll('.songItem')[index].style.backgroundColor = 'white';

        document.querySelectorAll('.songPlay')[songIndex].classList.remove('fa-play-circle');
        document.querySelectorAll('.songPlay')[songIndex].classList.add('fa-pause-circle');
        document.querySelectorAll('.songItem')[songIndex].style.backgroundColor = 'green';

        gif.style.opacity = 0;
        container.style.backgroundImage = `url('${songList[songIndex].cover}')`;

        setTimeout(() => {
            gif.getElementsByTagName('p')[0].innerText = `${songList[songIndex].cast}`;
            gif.style.opacity = 1;
        }, 400);
        
    }

    timeStamp.innerText = secondsToMMSS();
    timeStamp.style.opacity = 1;
    
});

progressBar.addEventListener('change', () => {

    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

function makeAllPlays() {

    Array.from(document.getElementsByClassName('songPlay')).forEach((element) => {

        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');

    });
}

function makeAllPause() {

    Array.from(document.getElementsByClassName('songPlay')).forEach((element) => {

        element.classList.remove('fa-play-circle');
        element.classList.add('fa-pause-circle');
    });
}

Array.from(document.getElementsByClassName('songPlay')).forEach((element, index) => {

    element.addEventListener('click', (e) => {

        if (audioElement.paused || audioElement.currentTime == 0) {

            if (songIndex != index) {
                audioElement.currentTime = 0;
                audioElement.src = songList[index].filePath;
            }

            songIndex = index;
            audioElement.play();
            makeAllPlays();
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.getElementsByTagName('p')[0].innerText = `${songList[songIndex].cast}`;
            gif.style.opacity = 1;
            document.querySelectorAll('.songItem')[songIndex].style.backgroundColor = 'green';
            container.style.backgroundImage = `url('${songList[songIndex].cover}')`;
        }
        else {

            if (songIndex != index) {

                audioElement.pause();
                gif.style.opacity = 0;
                audioElement.currentTime = 0;
                audioElement.src = songList[index].filePath;
                audioElement.play();
                e.target.classList.remove('fa-play-circle');
                e.target.classList.add('fa-pause-circle');
                document.querySelectorAll('.songPlay')[songIndex].classList.remove('fa-pause-circle');
                document.querySelectorAll('.songPlay')[songIndex].classList.add('fa-play-circle');
                document.querySelectorAll('.songItem')[songIndex].style.backgroundColor = 'white';
                document.querySelectorAll('.songItem')[index].style.backgroundColor = 'green';

                setTimeout(() => {
                    gif.getElementsByTagName('p')[0].innerText = `${songList[index].cast}`;
                    gif.style.opacity = 1;
                }, 400);

                container.style.backgroundImage = `url('${songList[index].cover}')`;
            }
            else {
                audioElement.pause();
                e.target.classList.remove('fa-pause-circle');
                e.target.classList.add('fa-play-circle');
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
                gif.style.opacity = 0;
                container.style.backgroundImage = `url('../static/coverPics/bg.jpg')`;
                document.querySelectorAll('.songItem')[songIndex].style.backgroundColor = 'white';
            }
            songIndex = index;
        }
    });
});

next.addEventListener('click', () => {

    let index = songIndex;

    if (songIndex >= 10) {

        songIndex = 0;
    }
    else {
        songIndex++;
    }

    document.querySelectorAll('.songPlay')[index].classList.remove('fa-pause-circle');
    document.querySelectorAll('.songPlay')[index].classList.add('fa-play-circle');
    document.querySelectorAll('.songItem')[index].style.backgroundColor = 'white';

    document.querySelectorAll('.songPlay')[songIndex].classList.remove('fa-play-circle');
    document.querySelectorAll('.songPlay')[songIndex].classList.add('fa-pause-circle');
    document.querySelectorAll('.songItem')[songIndex].style.backgroundColor = 'green';

    audioElement.currentTime = 0;

    audioElement.src = songList[songIndex].filePath;

    audioElement.play();

    gif.style.opacity = 0;

    setTimeout(() => {
        gif.getElementsByTagName('p')[0].innerText = `${songList[songIndex].cast}`;
        gif.style.opacity = 1;
    }, 400);

    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    container.style.backgroundImage = `url('${songList[songIndex].cover}')`;
});

previous.addEventListener('click', () => {

    let index = songIndex;

    if (songIndex <= 0) {

        songIndex = 10;
    }
    else {
        songIndex--;
    }

    document.querySelectorAll('.songPlay')[index].classList.remove('fa-pause-circle');
    document.querySelectorAll('.songPlay')[index].classList.add('fa-play-circle');
    document.querySelectorAll('.songItem')[index].style.backgroundColor = 'white';

    document.querySelectorAll('.songPlay')[songIndex].classList.remove('fa-play-circle');
    document.querySelectorAll('.songPlay')[songIndex].classList.add('fa-pause-circle');
    document.querySelectorAll('.songItem')[songIndex].style.backgroundColor = 'green';

    audioElement.currentTime = 0;

    audioElement.src = songList[songIndex].filePath;

    audioElement.play();

    gif.style.opacity = 0;

    setTimeout(() => {
        gif.getElementsByTagName('p')[0].innerText = `${songList[songIndex].cast}`;
        gif.style.opacity = 1;
    }, 400);

    container.style.backgroundImage = `url('${songList[songIndex].cover}')`;

    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

searchArtist.addEventListener('input', ()=>{

    let inputtxt = searchArtist.value;
    let album = document.getElementsByClassName('Album');

   Array.from(album).forEach((element)=>{

    if(element.getElementsByTagName('h1')[0].innerText.toLowerCase().includes(inputtxt.toLowerCase())) {

        element.style.display = 'block';
    }
    else {

        element.style.display = 'none';
    }
   });

});

searchSong.addEventListener('input', ()=>{

    let inputTxt = searchSong.value;

    let songs = document.getElementsByClassName('songItem');

    Array.from(songs).forEach((element)=>{

        if(element.getElementsByTagName('span')[0].innerText.toLowerCase().includes(inputTxt.toLowerCase())) {

            element.style.display = 'flex';
        }
        else {
            element.style.display = 'none';
        }
    });
});




