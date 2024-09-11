let canvas;
let world;
let keyboard = new KeyboardObject(); // speichert ein neues KeyboardObjekt in die Variable Keyboard
let dPressed = false;
let mainMusicIsPlaying = true;

function init() {
    canvas = document.getElementById('canvas'); // das ist unser canvas
    world = new World(canvas, keyboard); // das erstellt ein neues World Objekt, in das wir das Canvas und das Keyboardobjekt reingeben

}

document.addEventListener('DOMContentLoaded', () => {
    let playButton = document.getElementById('play-button');
    let musicButton = document.getElementById('pause-music-button');
    if (playButton) {
        playButton.addEventListener('click', (event) => {
            initLevel();
            init();
            event.target.blur();
            musicButton.disabled = false;
            playButton.disabled = true;
        });
    }
});

window.addEventListener('keydown', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 38) {
        keyboard.UP = true;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (event.keyCode == 68 && !dPressed) {
        keyboard.D = true;
        dPressed = true;
    }

});

window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 38) {
        keyboard.UP = false;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (event.keyCode == 68) {
        keyboard.D = false;
        dPressed = false;
    }
});