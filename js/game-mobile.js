/**
 * Hides the mobile controls and the fullscreen/sound settings container.
 * 
 * @function
 * @returns {void}
 */
function hideMobileControlls() {
    const elements = getDomElements();
    elements.mobileControllsContainer.classList.add('d-none');
    elements.mobileFullscreenAndSoundContainer.classList.add('d-none');
}

/**
 * Initializes and starts the game in mobile mode.
 *
 * This function sets up the event listener for the mobile play button. When the play button is clicked,
 * the game is initialized, relevant UI elements are displayed, and specific button states are updated.
 *
 * @param {HTMLElement} playButton - The button used to start the game on mobile devices.
 * @param {HTMLElement} mobileControllsContainer - The container for mobile controls that will be shown when the game starts.
 * @param {HTMLElement} playAndControllMobileButtonContainer - The container for play and control buttons that will be hidden when the game starts.
 * @param {HTMLElement} mobileFullscreenAndSoundContainer - The container for fullscreen and sound control buttons, which will be shown once the game starts.
 * @param {HTMLElement} canvas - The canvas where the game is drawn, which becomes visible once the game starts.
 * 
 * @returns {void}
 */
function startGameMobile(playButton, mobileControllsContainer, playAndControllMobileButtonContainer, mobileFullscreenAndSoundContainer, canvas) {
    playButton.addEventListener('click', (event) => {
        initLevel();
        init();
        event.target.blur();
        mobileControllsContainer.classList.remove('d-none');
        playAndControllMobileButtonContainer.classList.add('force-hidden');
        mobileFullscreenAndSoundContainer.classList.remove('d-none');
        canvas.classList.remove('d-none');
        playedOnMobile = true;
    });
}

/**
 * Displays mobile controls for the game.
 *
 * This function checks if the game is being played on a mobile device.
 * If so, it reveals the mobile controls and the container for the fullscreen
 * and sound effect toggles by removing the 'd-none' class from the relevant
 * DOM elements.
 *
 * @returns {void}
 */
function showMobileControlls() {
    if (playedOnMobile) {
        let mobilControllsContainer = document.getElementById('mobile-controlls-container');
        let handleFullScreenMusicAndSoundeffectContainer = document.getElementById('enter-fullscreen-and-toggle-mobile-music-and-soundeffect-container');
        mobilControllsContainer.classList.remove('d-none');
        handleFullScreenMusicAndSoundeffectContainer.classList.remove('d-none');
    }
}

/**
 * Toggles the mobile controls view for the game.
 *
 * This function retrieves the necessary DOM elements and calls the 
 * `toggleMobileView` function to either show or hide the mobile controls,
 * including the help container and the exit button. It also updates the 
 * background state accordingly.
 *
 * @returns {void}
 */
function toggleMobileControlls() {
    let background = document.getElementById('fullscreen-container');
    let playAndControllButtonContainer = document.getElementById("mobile-start-game-and-controll-container");
    let helpContainer = document.getElementById('help-container');
    let exitMobileControllsButton = document.getElementById('exit-controlls-button-mobile');

    toggleMobileView(helpContainer, exitMobileControllsButton, playAndControllButtonContainer, background);
}

/**
 * Toggles the visibility of the mobile view controls.
 *
 * This function checks the current state of the controls and either opens
 * or closes the mobile view by calling the respective functions. It updates
 * the background, the specified container, the exit button, and the button
 * container based on the current state.
 *
 * @param {HTMLElement} container - The container element for the mobile controls.
 * @param {HTMLElement} exitButton - The button to exit the mobile controls.
 * @param {HTMLElement} buttonContainer - The container for the start and control buttons.
 * @param {HTMLElement} background - The background element that may change state.
 * @returns {void}
 */
function toggleMobileView(container, exitButton, buttonContainer, background) {
    if (!controllsOpen) {
        openMobileView(background, container, exitButton, buttonContainer);
    } else {
        closeMobileView(background, container, exitButton, buttonContainer);
    }
}

/**
 * Opens the mobile view controls.
 *
 * This function updates the state of various UI elements to display the
 * mobile controls. It hides the main button container and shows the
 * specified exit button and the mobile control container. Additionally,
 * it modifies the background styling to indicate that the mobile view
 * is active.
 *
 * @param {HTMLElement} background - The background element to update its state.
 * @param {HTMLElement} container - The container for the mobile controls to be displayed.
 * @param {HTMLElement} exitButton - The button that allows users to exit the mobile controls.
 * @param {HTMLElement} buttonContainer - The container for the main control buttons to be hidden.
 * @returns {void}
 */

function openMobileView(background, container, exitButton, buttonContainer) {
    background.classList.add('no-bg');
    container.classList.remove('d-none');
    exitButton.classList.remove('d-none');
    buttonContainer.classList.add('force-hidden');
    controllsOpen = true;
}

/**
 * Closes the mobile view controls.
 *
 * This function updates the state of various UI elements to hide the
 * mobile controls. It restores the main button container, hides the
 * exit button, and updates the background styling to indicate that 
 * the mobile view is no longer active.
 *
 * @param {HTMLElement} background - The background element to update its state.
 * @param {HTMLElement} container - The container for the mobile controls to be hidden.
 * @param {HTMLElement} exitButton - The button that allows users to exit the mobile controls.
 * @param {HTMLElement} buttonContainer - The container for the main control buttons to be shown.
 * @returns {void}
 */
function closeMobileView(background, container, exitButton, buttonContainer) {
    container.classList.add('d-none');
    background.classList.remove('no-bg');
    exitButton.classList.add('d-none');
    buttonContainer.classList.remove('force-hidden');
    controllsOpen = false;
}

/**
 * Toggles the visibility of the mobile imprint section.
 *
 * This function checks the current state of the mobile controls and
 * either opens or closes the imprint section based on that state.
 * It updates the background and controls visibility accordingly.
 *
 * @returns {void}
 */
function toggleMobileImprint() {
    let background = document.getElementById('fullscreen-container');
    let imprintContainer = document.getElementById('imprint-container');
    let exitMobileImprintButton = document.getElementById('exit-imprint-button-mobile');
    let playAndControllButtonContainer = document.getElementById("mobile-start-game-and-controll-container");

    toggleMobileView(imprintContainer, exitMobileImprintButton, playAndControllButtonContainer, background);
}

/**
 * Assigns touch events to mobile control buttons.
 * 
 * @returns {void}
 */
function assignmentOfTouchToMobileButtons() {
    document.getElementById("mobile-btn-right").addEventListener('touchstart', (e) => {
        keyboard.RIGHT = true;
    });

    document.getElementById("mobile-btn-right").addEventListener('touchend', (e) => {
        keyboard.RIGHT = false;
    });

    document.getElementById("mobile-btn-left").addEventListener('touchstart', (e) => {
        keyboard.LEFT = true;
    });

    document.getElementById("mobile-btn-left").addEventListener('touchend', (e) => {
        keyboard.LEFT = false;
    });

    document.getElementById("mobile-btn-jump").addEventListener('touchstart', (e) => {
        keyboard.SPACE = true;
    });

    document.getElementById("mobile-btn-jump").addEventListener('touchend', (e) => {
        keyboard.SPACE = false;
    });

    document.getElementById("mobile-btn-throw").addEventListener('touchstart', (e) => {
        keyboard.D = true;
    });

    document.getElementById("mobile-btn-throw").addEventListener('touchend', (e) => {
        keyboard.D = false;
    });
}