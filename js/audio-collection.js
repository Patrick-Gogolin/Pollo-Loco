let soundeffectsOn = true;
let sounds = [];
let main_music = new Audio('audio/mainMusic.mp3');
let savedMusicState = null;
let savedSoundEffectState = null;

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
    savedMusicState = localStorage.getItem('musicState');
    if (savedMusicState === "on") {
        turnMusicOff(button, event);
    }
    else if (savedMusicState === "off") {
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
    main_music.play();
    main_music.loop = true;
    button.innerText = "Turn Music Off";
    localStorage.setItem('musicState', 'on');
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
    main_music.pause();
    button.innerText = "Turn Music On";
    localStorage.setItem('musicState', 'off');
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
    savedSoundEffectState = localStorage.getItem('soundEffectState');
    if (savedSoundEffectState === "on") {
        muteSounds(button, event);
    }
    else if (savedSoundEffectState === "off") {
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
function muteSounds(button, event) {
    button.innerText = "Turn Soundeffects on";
    localStorage.setItem('soundEffectState', 'off');
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
function unmuteSounds(button, event) {
    button.innerText = "Turn Soundeffects off";
    localStorage.setItem('soundEffectState', 'on');
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
    savedMusicState = localStorage.getItem('musicState');
    if (savedMusicState === "on") {
        turnMusicOffMobile();
    }
    else if (savedMusicState === "off") {
        turnMusicOnMobile();
    }
}

/**
 * Starts playing the main music on mobile devices and updates the music state to playing.
 *
 * @returns {void} This function does not return a value.
 */
function turnMusicOnMobile() {
    main_music.play();
    main_music.loop = true;
    localStorage.setItem('musicState', 'on');
}

/**
 * Pauses the main music on mobile devices and updates the music state to not playing.
 *
 * @returns {void} This function does not return a value.
 */
function turnMusicOffMobile() {
    main_music.pause();
    localStorage.setItem('musicState', 'off');
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
    savedSoundEffectState = localStorage.getItem('soundEffectState');
    if(savedSoundEffectState === "on") {
        muteSoundsMobile();
    }
    else if(savedSoundEffectState === "off") {
        unmuteSoundsMobile();
    }
}

/**
 * Mutes all sound effects on mobile devices by setting their volume to zero.
 *
 * @returns {void} This function does not return a value.
 */
function muteSoundsMobile() {
    localStorage.setItem('soundEffectState', 'off');
}

/**
 * Restores the volume of all sound effects on mobile devices by setting their volume to one.
 *
 * @returns {void} This function does not return a value.
 */
function unmuteSoundsMobile() {
    localStorage.setItem('soundEffectState', 'on');
} 

/**
 * Initializes default states for music and sound effects in localStorage on page load.
 * 
 * This event listener waits for the DOM content to be fully loaded before checking the `musicState` 
 * and `soundEffectState` values in localStorage. If these values are not present (e.g., on the first visit), 
 * it sets both `musicState` and `soundEffectState` to 'on' as default values.
 * 
 * @event DOMContentLoaded
 * 
 * @returns {void} This function does not return a value.
 */
document.addEventListener('DOMContentLoaded', () => {
    savedMusicState = localStorage.getItem('musicState');
    savedSoundEffectState = localStorage.getItem('soundEffectState');

    if (savedMusicState === null) {
        localStorage.setItem('musicState', 'on');
    }
    if (savedSoundEffectState === null) {
        localStorage.setItem('soundEffectState', 'on');
    }
});

/**
 * Plays or pauses the main background music based on the saved state in localStorage.
 * 
 * @function playMainMusic
 * @returns {void}
 */
function playMainMusic() {
  let musicButton = document.getElementById('pause-music-button');
  savedMusicState = localStorage.getItem('musicState');
  main_music.currentTime = 0;
  main_music.volume = 1;

  if (savedMusicState === 'on') {
      main_music.play();
      main_music.loop = true;
      musicButton.innerText = "Turn Music Off";
  } else {
      main_music.pause();
      musicButton.innerText = "Turn Music On";
  }
  labelSoundeffectButton();
}

/**
 * Updates the text label of the sound effects toggle button based on the sound effects state.
 * 
 * This function retrieves the sound effect state from the local storage (under 'soundEffectState')
 * and updates the button text accordingly. If sound effects are enabled ('on'), it sets the button label 
 * to "Turn Soundeffects off". Otherwise, it sets the label to "Turn Soundeffects on".
 * 
 * @returns {void} This function does not return a value.
 */
function labelSoundeffectButton() {
    let soundeffectButton = document.getElementById('pause-soundeffects-button');
    savedSoundEffectState = localStorage.getItem('soundEffectState');
    if(savedSoundEffectState === "on") {
        soundeffectButton.innerText = "Turn Soundeffects off";
    }
    else {
        soundeffectButton.innerText = "Turn Soundeffects on";
    }
}

/**
 * Plays the provided sound effect if the sound effects are enabled in the local storage.
 * 
 * This function checks the state of the sound effects (stored in local storage under 'soundEffectState').
 * If the state is set to "on", it plays the provided sound effect.
 * 
 * @param {HTMLAudioElement} sound - The sound effect to be played. It should be an instance of the HTMLAudioElement class.
 */
function playSoundeffects(sound) {
    let savedSoundEffectState = localStorage.getItem('soundEffectState');
        if(savedSoundEffectState === "on") {
            sound.play();
        }
}