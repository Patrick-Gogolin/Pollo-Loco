let canvas;
let world;
let keyboard = new KeyboardObject();
let dPressed = false;
let controllsOpen = false;
let playedOnMobile = false;

/**
 * Initializes the game by selecting the canvas element and creating a new instance of the World object with the provided canvas and keyboard inputs.
 * 
 * @global {HTMLCanvasElement} canvas - The canvas element where the game world will be rendered.
 * @global {World} world - The global instance of the World object that represents the game environment.
 * @param {HTMLCanvasElement} canvas - The canvas element where the game will be drawn.
 * @param {Object} keyboard - The object representing the state of keyboard inputs used in the game.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * Retrieves various DOM elements used in the game interface and returns them in an object.
 * 
 * @returns {Object} An object containing references to the following DOM elements:
 * 
 */
function getDomElements() {
    return {
        canvas: document.getElementById('canvas'),
        desktopPlayButton: document.getElementById('play-button'),
        playMobileButton: document.getElementById('play-button-mobile'),
        musicButton: document.getElementById('pause-music-button'),
        soundeffectsButton: document.getElementById('pause-soundeffects-button'),
        helpButton: document.getElementById('help-button'),
        mobileControllsContainer: document.getElementById('mobile-controlls-container'),
        fullscreenButton: document.getElementById('fullscreen-img'),
        toggleMobileMusic: document.getElementById('mute-music-mobile-button'),
        toggleMobileSoundEffects: document.getElementById('mute-soundeffects-mobile-button'),
        playAndControllMobileButtonContainer: document.getElementById('mobile-start-game-and-controll-container'),
        desktopPlayHelpImprintButtonContainer: document.getElementById('desktop-play-help-imprint-button-container'),
        desktopMusicAndSoundeffectsButtonContainer: document.getElementById('desktop-music-and-soundeffects-button-container'),
        restartGameAndBackToHomeScreenButtonContainer: document.getElementById('restart-game-and-back-to-homescreen-button-container'),
        winningScreen: document.getElementById('winning-screen'),
        loosingScreen: document.getElementById('loosing-screen'),
        mobileFullscreenAndSoundContainer: document.getElementById('enter-fullscreen-and-toggle-mobile-music-and-soundeffect-container'),
        desktopFullscreenContainer: document.getElementById('desktop-fullscreen-button-container')
    };
}

/**
 * Stops the game and determines whether the player has won or lost.
 * 
 * @function
 * @returns {void}
 */
function stopGame() {
    setTimeout(() => {
        if (world.character.energy <= 0) {
            handleLooseGame();
        } else {
            handleWinGame();
        }
        clearAllIntervals();
    }, 1250);
}

/**
 * Clears all active intervals.
 * 
 * @function
 * @returns {void}
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Handles the game over scenario when the player loses.
 * 
 * @function
 * @returns {void}
 */
function handleLooseGame() {
    const elements = getDomElements();
    soundeffectsOn = true;
    mainMusicIsPlaying = true;

    elements.loosingScreen.classList.remove('d-none');
    elements.restartGameAndBackToHomeScreenButtonContainer.classList.remove('d-none');
    elements.soundeffectsButton.disabled = true;
    elements.musicButton.disabled = true;
    elements.desktopFullscreenContainer.classList.add('d-none');
    hideMobileControlls();
}

/**
 * Handles the game win scenario when the player defeats the endboss.
 * 
 * @function
 * @returns {void}
 */
function handleWinGame() {
    const elements = getDomElements();
    soundeffectsOn = true;
    mainMusicIsPlaying = true;

    world.level.endboss.forEach((endboss) => {
        if (endboss.energy <= 0) {
            elements.winningScreen.classList.remove('d-none');
            elements.restartGameAndBackToHomeScreenButtonContainer.classList.remove('d-none');
            elements.soundeffectsButton.disabled = true;
            elements.musicButton.disabled = true;
            elements.desktopFullscreenContainer.classList.add('d-none');
            hideMobileControlls();
        }
    });
}

/**
 * Event listener that triggers once the DOM has fully loaded.
 *
 * This function assigns touch events to mobile buttons and starts the game either in desktop or mobile mode 
 * depending on the available DOM elements. It initializes game elements, controls, and UI settings.
 * 
 * @event DOMContentLoaded
 * @function
 * @returns {void}
 */
document.addEventListener('DOMContentLoaded', () => {
    const elements = getDomElements();
    assignmentOfTouchToMobileButtons();
    if (elements.desktopPlayButton) {
        startGameDesktop(elements.desktopPlayButton, elements.musicButton, elements.soundeffectsButton, elements.helpButton, elements.fullscreenButton, elements.desktopPlayHelpImprintButtonContainer, elements.desktopMusicAndSoundeffectsButtonContainer, elements.canvas, elements.desktopFullscreenContainer);
    }
    if (elements.playMobileButton) {
        startGameMobile(elements.playMobileButton, elements.mobileControllsContainer, elements.playAndControllMobileButtonContainer, elements.mobileFullscreenAndSoundContainer, elements.canvas);
    }
});

/**
 * Initializes and starts the game in desktop mode.
 *
 * @param {HTMLElement} playButton - The button used to start the game.
 * @param {HTMLElement} musicButton - The button to toggle music on or off.
 * @param {HTMLElement} soundeffectsButton - The button to toggle sound effects on or off.
 * @param {HTMLElement} helpButton - The help button that will be disabled once the game starts.
 * @param {HTMLElement} fullscreenButton - The button for enabling fullscreen mode.
 * @param {HTMLElement} desktopPlayHelpImprintButtonContainer - The container for play/help/imprint buttons that will be hidden when the game starts.
 * @param {HTMLElement} desktopMusicAndSoundeffectsButtonContainer - The container for music and sound effect buttons, which will be shown once the game starts.
 * @param {HTMLElement} canvas - The canvas where the game is drawn, which becomes visible once the game starts.
 * @param {HTMLElement} desktopFullscreenContainer - The container for the fullscreen button, which is shown once the game starts.
 * 
 * @returns {void}
 */
function startGameDesktop(playButton, musicButton, soundeffectsButton, helpButton, fullscreenButton, desktopPlayHelpImprintButtonContainer, desktopMusicAndSoundeffectsButtonContainer, canvas, desktopFullscreenContainer) {
    playButton.addEventListener('click', (event) => {
        initLevel();
        init();
        event.target.blur();
        playButton.disabled = true;
        musicButton.disabled = false;
        soundeffectsButton.disabled = false;
        helpButton.disabled = true;
        fullscreenButton.classList.remove('d-none');
        desktopPlayHelpImprintButtonContainer.classList.add('force-hidden');
        desktopMusicAndSoundeffectsButtonContainer.classList.remove('d-none');
        canvas.classList.remove('d-none');
        playedOnMobile = false;
        desktopFullscreenContainer.classList.remove('d-none');
    });
}

/**
 * Restarts the game by resetting the user interface, buttons, and game world.
 *
 * @returns {void}
 */
function restartGame() {
    resetUI();
    resetButtons();
    resetGameWorld();
    showMobileControlls();
}

/**
 * Resets the user interface elements of the game.
 *
 * @returns {void}
 */
function resetUI() {
    const elements = getDomElements();
    
    elements.loosingScreen.classList.add('d-none');
    elements.winningScreen.classList.add('d-none');
    elements.restartGameAndBackToHomeScreenButtonContainer.classList.add('d-none');
}

/**
 * Resets the state of various buttons in the game.
 *
 * @returns {void}
 */
function resetButtons() {
    const elements = getDomElements();

    elements.musicButton.disabled = false;
    elements.musicButton.innerText = "Turn Music off";
    elements.soundeffectsButton.disabled = false;
    elements.soundeffectsButton.innerText = "Turn Soundeffects off";
    elements.desktopFullscreenContainer.classList.remove('d-none');
}

/**
 * Resets the game world to its initial state.
 *
 * @returns {void}
 */
function resetGameWorld() {
    initLevel();
    init();
}

/**
 * Resets the game state and navigates back to the home screen.
 *
 * @returns {void}
 */
function backToHome() {
    let elements = getDomElements();

    if (!playedOnMobile) {
        elements.desktopPlayHelpImprintButtonContainer.classList.remove('force-hidden');
        elements.desktopMusicAndSoundeffectsButtonContainer.classList.add('d-none');
        elements.desktopPlayButton.disabled = false;
        elements.helpButton.disabled = false;
        elements.musicButton.innerText = "Turn Music off";
        elements.soundeffectsButton.innerText = "Turn Soundeffects off";
    }
    else if(playedOnMobile) {
        elements.playAndControllMobileButtonContainer.classList.remove('force-hidden');
    }
    elements.restartGameAndBackToHomeScreenButtonContainer.classList.add('d-none');
    elements.winningScreen.classList.add('d-none');
    elements.loosingScreen.classList.add('d-none');
    elements.canvas.classList.add('d-none');
}

/**
 * Toggles the visibility of the controls section and updates the button text.
 *
 * @returns {void}
 */
function toggleControlls() {
    let helpButton = document.getElementById('help-button');
    let imprintButton = document.getElementById('imprint-button');
    let helpContainer = document.getElementById('help-container');

   toggleSection(helpContainer, helpButton, imprintButton, "Controlls", "Back");
}

/**
 * Toggles the visibility of a specified section and updates button text.
 *
 * @param {HTMLElement} container - The DOM element of the section to toggle.
 * @param {HTMLElement} buttonToToggle - The button that triggers the toggle.
 * @param {HTMLElement} otherButton - The other button to manage alongside.
 * @param {string} buttonTextOpen - The text to display when the section is opened.
 * @param {string} buttonTextClose - The text to display when the section is closed.
 * @returns {void}
 */
function toggleSection(container, buttonToToggle, otherButton, buttonTextOpen, buttonTextClose) {
    let playButton = document.getElementById('play-button');
    let background = document.getElementById('fullscreen-container');
    
    if (!controllsOpen) {
        openSection(background, container, playButton, buttonToToggle, otherButton, buttonTextClose);
    } else {
        closeSection(background, container, playButton, buttonToToggle, otherButton, buttonTextOpen);
    }
}

/**
 * Opens a specified section, updates the background, and modifies button states.
 *
 * @param {HTMLElement} background - The DOM element representing the background.
 * @param {HTMLElement} container - The DOM element of the section to open.
 * @param {HTMLElement} playButton - The button that controls gameplay.
 * @param {HTMLElement} buttonToToggle - The button that is toggled on opening the section.
 * @param {HTMLElement} otherButton - The other button to manage alongside.
 * @param {string} buttonTextClose - The text to display on the button that was toggled.
 * @returns {void}
 */
function openSection(background, container, playButton, buttonToToggle, otherButton, buttonTextClose) {
    background.classList.add('no-bg');
    container.classList.remove('d-none');
    playButton.disabled = true;
    controllsOpen = true;
    buttonToToggle.innerText = buttonTextClose;
    otherButton.disabled = true;
}

/**
 * Closes a specified section, updates the background, and restores button states.
 *
 * @param {HTMLElement} background - The DOM element representing the background.
 * @param {HTMLElement} container - The DOM element of the section to close.
 * @param {HTMLElement} playButton - The button that controls gameplay.
 * @param {HTMLElement} buttonToToggle - The button that is toggled when closing the section.
 * @param {HTMLElement} otherButton - The other button to manage alongside.
 * @param {string} buttonTextOpen - The text to display on the button after closing the section.
 * @returns {void}
 */
function closeSection(background, container, playButton, buttonToToggle, otherButton, buttonTextOpen) {
    container.classList.add('d-none');
    background.classList.remove('no-bg');
    buttonToToggle.innerText = buttonTextOpen;
    controllsOpen = false;
    playButton.disabled = false;
    otherButton.disabled = false;
}

/**
 * Toggles the display of the imprint section and updates the relevant buttons.
 *
 * @returns {void}
 */
function toggleImprint() {
    let imprintButton = document.getElementById('imprint-button');
    let helpButton = document.getElementById('help-button');
    let imprintContainer = document.getElementById('imprint-container');

    toggleSection(imprintContainer, imprintButton, helpButton, "Impressum", "Back");
}

/**
 * Handles keydown events to update the keyboard state.
 *
 * @returns {void}
 */
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

/**
 * Handles keyup events to update the keyboard state.
 *
 * @returns {void}
 */
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