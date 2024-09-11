let soundeffectsOn = true;
let sounds = [];
let main_music = new Audio('audio/mainMusic.mp3');


document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('pause-music-button');
    button.addEventListener('click', (event) => {
      toggleMusic(button, event);
    });
});

function toggleMusic(button, event) {
    if (mainMusicIsPlaying) {
        turnMusicOn(button, event);
    }
    else if (!mainMusicIsPlaying) {
        turnMusicOff(button, event);
    }
}

function turnMusicOn(button, event) {
    world.main_music.pause();
    button.innerText = "Turn Music On";
    mainMusicIsPlaying = false;
    event.target.blur();
}

function turnMusicOff(button, event) {
    world.main_music.play();
    button.innerText = "Turn Music Off";
    mainMusicIsPlaying = true;
    event.target.blur();
}

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('pause-soundeffects-button');
    button.addEventListener('click', (event) => {
        toggleSoundEffects(button, event)
    });
});

function toggleSoundEffects(button, event) {
    if(soundeffectsOn) {
        muteSounds(button, event);
    }
    else if(!soundeffectsOn) {
        unmuteSounds(button, event);
    }
}

let muteSounds = (button, event) => {
    sounds.forEach(sound => {
        sound.volume = 0; 
    });
    soundeffectsOn = false;
    button.innerText = "Turn Soundeffects on";
    event.target.blur();
};

let unmuteSounds = (button, event) => {
    sounds.forEach(sound => {
        sound.volume = 1;
    });
    soundeffectsOn = true;
    button.innerText = "Turn Soundeffects off";
    event.target.blur();
};