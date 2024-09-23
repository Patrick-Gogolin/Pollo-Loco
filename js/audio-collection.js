let soundeffectsOn = true;
let sounds = [];
let main_music = new Audio('audio/mainMusic.mp3');
let mainMusicIsPlaying = true;

/**
 * Adds an event listener for the 'DOMContentLoaded' event to ensure that
 * the DOM is fully loaded before adding event listeners for the pause music button.
 * 
 * @event {Event} DOMContentLoaded - Triggered when the initial HTML document is completely loaded and parsed.
 * @description Initializes the button event listener for music control.
 * 
 * @listens {click} #pause-music-button - Adds a click event listener for the pause music button.
 * @param {MouseEvent} event - The MouseEvent object that contains information about the click.
 * @param {HTMLElement} button - The button element used to pause the music.
 */
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('pause-music-button');
    button.addEventListener('click', (event) => {
      toggleMusic(button, event);
    });
});

/**
 * Toggles the state of the background music on or off based on its current state.
 * 
 * @param {HTMLElement} button - The button element that triggers the music toggle.
 * @param {MouseEvent} event - The MouseEvent object that contains information about the click event.
 * 
 * @returns {void}
 */
function toggleMusic(button, event) {
    if (mainMusicIsPlaying) {
        turnMusicOff(button, event);
    }
    else if (!mainMusicIsPlaying) {
        turnMusicOn(button, event);
    }
}

/**
 * Plays the background music and updates the button text to indicate that the music is on.
 * 
 * @param {HTMLElement} button - The button element that triggers the music on action.
 * @param {MouseEvent} event - The MouseEvent object that contains information about the click event.
 * 
 * @returns {void}
 */
function turnMusicOn(button, event) {
    world.main_music.play();
    button.innerText = "Turn Music Off";
    mainMusicIsPlaying = true;
    event.target.blur();
}

/**
 * Pauses the background music and updates the button text to indicate that the music is off.
 * 
 * @param {HTMLElement} button - The button element that triggers the music off action.
 * @param {MouseEvent} event - The MouseEvent object that contains information about the click event.
 * 
 * @returns {void}
 */
function turnMusicOff(button, event) {
    world.main_music.pause();
    button.innerText = "Turn Music On";
    mainMusicIsPlaying = false;  
    event.target.blur();
}

/**
 * Sets up an event listener for the DOMContentLoaded event to initialize the sound effects button.
 * When the button is clicked, it triggers the toggleSoundEffects function.
 * 
 * @returns {void}
 */ 
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('pause-soundeffects-button');
    button.addEventListener('click', (event) => {
        toggleSoundEffects(button, event)
    });
});

/**
 * Toggles the state of sound effects on or off based on the current state.
 * If sound effects are currently on, it mutes them; if they are off, it unmutes them.
 * 
 * @param {HTMLElement} button - The button element that triggers the toggle action.
 * @param {Event} event - The event object representing the click event.
 * 
 * @returns {void}
 */
function toggleSoundEffects(button, event) {
    if(soundeffectsOn) {
        muteSounds(button, event);
    }
    else if(!soundeffectsOn) {
        unmuteSounds(button, event);
    }
}

/**
 * Mutes all sound effects by setting their volume to zero and updates the button text.
 *
 * @param {HTMLElement} button - The button element that triggers the mute action.
 * @param {Event} event - The event object representing the event that triggered the function.
 * 
 * @returns {void} This function does not return a value.
 */
let muteSounds = (button, event) => {
    sounds.forEach(sound => {
        sound.volume = 0; 
    });
    soundeffectsOn = false;
    button.innerText = "Turn Soundeffects on";
    event.target.blur();
};

/**
 * Restores the volume of all sound effects and updates the button text to indicate the current state.
 *
 * @param {HTMLElement} button - The button element that triggers the unmute action.
 * @param {Event} event - The event object representing the event that triggered the function.
 * 
 * @returns {void} This function does not return a value.
 *
 */
let unmuteSounds = (button, event) => {
    sounds.forEach(sound => {
        sound.volume = 1;
    });
    soundeffectsOn = true;
    button.innerText = "Turn Soundeffects off";
    event.target.blur();
};

/**
 * Sets up the event listener for the mute music button once the DOM content is fully loaded.
 *
 * @event document#DOMContentLoaded
 * @type {function}
 * 
 */
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('mute-music-mobile-button');
    button.addEventListener('click', () => {
      toggleMusicMobile();
    });
});

/**
 * Toggles the state of the main music on mobile devices.
 * If the music is currently playing, it turns it off; if it is not playing, it turns it on.
 *
 * @returns {void} This function does not return a value.
 */
function toggleMusicMobile() {
    if (mainMusicIsPlaying) {
        turnMusicOffMobile();
    }
    else if (!mainMusicIsPlaying) {
        turnMusicOnMobile();
    }
}

/**
 * Starts playing the main music on mobile devices and updates the music state to playing.
 *
 * @returns {void} This function does not return a value.
 */
function turnMusicOnMobile() {
    world.main_music.play();
    mainMusicIsPlaying = true;
}

/**
 * Pauses the main music on mobile devices and updates the music state to not playing.
 *
 * @returns {void} This function does not return a value.
 */
function turnMusicOffMobile() {
    world.main_music.pause();
    mainMusicIsPlaying = false;
}

/**
 * Sets up the event listener for the mute sound effects button once the DOM content is fully loaded.
 *
 * @event document#DOMContentLoaded
 * @type {function}
 */
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('mute-soundeffects-mobile-button');
    button.addEventListener('click', () => {
        toggleSoundEffectsMobile()
    });
});

/**
 * Toggles the state of sound effects on mobile devices.
 * If sound effects are currently on, it mutes them; if they are off, it unmutes them.
 *
 * @returns {void} This function does not return a value.
 */
function toggleSoundEffectsMobile() {
    if(soundeffectsOn) {
        muteSoundsMobile();
    }
    else if(!soundeffectsOn) {
        unmuteSoundsMobile();
    }
}

/**
 * Mutes all sound effects on mobile devices by setting their volume to zero.
 *
 * @returns {void} This function does not return a value.
 */
let muteSoundsMobile = () => {
    sounds.forEach(sound => {
        sound.volume = 0; 
    });
    soundeffectsOn = false;
};

/**
 * Restores the volume of all sound effects on mobile devices by setting their volume to one.
 *
 * @returns {void} This function does not return a value.
 */
let unmuteSoundsMobile = () => {
    sounds.forEach(sound => {
        sound.volume = 1;
    });
    soundeffectsOn = true;
};