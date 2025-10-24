const conteiner = document.querySelector(".conteiner");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const audio = document.querySelector("#audio");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");








const player = new MusicPlayer(musicList);


window.addEventListener("load", () => {

    let music = player.getMusic();
    displayMusic(music)
    displayMusicList(player.musicList);
    isPlaying();


})

function displayMusic(music) {
    title.innerText = music.title;
    singer.innerText = music.singer;
    image.src = "image/" + music.img;
    audio.src = "mp3/" + music.audio;
}

play.addEventListener("click", () => {
    const isPlay = conteiner.classList.contains("playing");
    isPlay ? pauseMusic() : playMusic();
    console.log("play clicked");
});

next.addEventListener("click", () => {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    console.log("prev. button clicked");
    isPlaying();

})

prev.addEventListener("click", () => {
    player.previous();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    console.log("prev. button clicked");
    isPlaying();

})

function playMusic() {
    conteiner.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause";
    audio.play();
}
function pauseMusic() {
    conteiner.classList.remove("playing");
    play.querySelector("i").classList = "fa-solid fa-play";
    audio.pause();
}
audio.addEventListener("loadedmetadata", () => {
    console.log(audio.duration, "audio-duration");
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration)

});

audio.addEventListener("timeupdate", () => {

    progressBar.value = Math.floor(audio.currentTime);
    currentTime.innerText = calculateTime(progressBar.value);
    console.log("current time", currentTime.innerText);

});

const calculateTime = (toplamSaniye) => {
    const dakika = Math.floor(toplamSaniye / 60);
    const saniye = Math.floor(toplamSaniye % 60);
    const guncellenmisSaniye = saniye < 10 ? `0${saniye}` : `${saniye}`;
    const sonuc = `${dakika}:${guncellenmisSaniye}`;
    return sonuc;
};

progressBar.addEventListener("input", function (e) {
    currentTime.innerText = calculateTime(e.target.value);
    audio.currentTime = e.target.value;
    console.log(calculateTime(e.target.value))

})

let muteState = "sesli";
volume.addEventListener("click", () => {
    if (muteState === "sesli") {
        audio.muted = true;
        muteState = "sessiz"
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value = 0;
    } else {
        audio.muted = false;
        muteState = "sesli";
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = 100;

    }
})
volumeBar.addEventListener("input", (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
    if (value == 0) {
        audio.muted = true;
        muteState = "sessiz"
        volume.classList = "fa-solid fa-volume-xmark";
    } else {
        audio.muted = false;
        muteState = "sesli";
        volume.classList = "fa-solid fa-volume-high";
    }
})

const displayMusicList = (liste) => {
    for (let i = 0; i < liste.length; i++) {
        let litag = `
            <li li-index="${i}" onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center  ">
                <span>${liste[i].getName()}</span>
                <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
                <audio class="music-${i}" src="mp3/${liste[i].audio}"> </audio>
            </li>`;
        ul.insertAdjacentHTML("beforeend", litag);

        let liAudioDuration = ul.querySelector(`#music-${i}`)
        let liAudioTag = ul.querySelector(`.music-${i}`)
        liAudioTag.addEventListener("loadeddata", () => {
            liAudioDuration.innerText = calculateTime(liAudioTag.duration);
        })

    }
}
const selectedMusic = (li) => {
    player.index = li.getAttribute("li-index");

    console.log(li.getAttribute("li-index"), "li get attrabute");
    console.log("li get attrabute");


    displayMusic(player.getMusic());
    playMusic();
    isPlaying();
}
const isPlaying = () => {
    for (let li of ul.querySelectorAll("li")) {
        if (li.classList.contains("playing")) {
            li.classList.remove("playing")
        }
        if (li.getAttribute("li-index") == player.index) {
            li.classList.add("playing")
        }
    }
};
audio.addEventListener("ended", () => {
    next();
})