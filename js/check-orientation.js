/**
 * Activates fullscreen mode for the specified container element.
 *
 * @returns {void} This function does not return a value.
 */
function fullscreen() {
    let fullscreen = document.getElementById('fullscreen-container');
    enterFullscreen(fullscreen);
}

/**
 * Requests fullscreen mode for the specified HTML element.
 *
 * @param {HTMLElement} element - The element to be displayed in fullscreen mode.
 * @returns {void} This function does not return a value.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode if it is currently active.
 *
 * @returns {void} This function does not return a value.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * Updates the visibility of fullscreen control buttons based on the fullscreen state of the document.
 *
 * @event document#fullscreenchange
 * @type {function}
 * 
 * @returns {void} This function does not return a value.
 */
document.addEventListener('fullscreenchange', () => {
    let fullscreenButton = document.getElementById('fullscreen-img');
    let desktopFullScreenButton = document.getElementById('desktop-fullscreen-img');
    let desktopExitFullScreenButton = document.getElementById('desktop-exit-fullscreen-img');
    let exitFullscreenButton = document.getElementById('exit-fullscreen-img');

    if (document.fullscreenElement) {
        fullscreenButton.classList.add('d-none');
        desktopFullScreenButton.classList.add('d-none');
        exitFullscreenButton.classList.remove('d-none');
        desktopExitFullScreenButton.classList.remove('d-none');

    } else {
        fullscreenButton.classList.remove('d-none');
        exitFullscreenButton.classList.add('d-none');
        desktopFullScreenButton.classList.remove('d-none');
        desktopExitFullScreenButton.classList.add('d-none');
    }
});

/**
 * Checks the device orientation and updates the visibility of the overlay and desktop buttons accordingly.
 *
 * @returns {void} This function does not return a value.
 */
function checkOrientation() {
    let portrait = window.matchMedia("(orientation: portrait)").matches;
    let turnYourDeviceOverlay = document.getElementById("overlay");
    let desktopButtons = document.getElementById('container-for-buttons');

    if (portrait) {
        turnYourDeviceOverlay.classList.remove("d-none");
        desktopButtons.classList.add("d-none");
    } else {
        turnYourDeviceOverlay.classList.add("d-none");
        desktopButtons.classList.remove("d-none");
    }
}

/**
 * Listens for changes in the device orientation and calls checkOrientation when the orientation changes.
 *
 * @event window#orientationchange
 * @type {function}
 * 
 * @returns {void} This function does not return a value.
 */
window.matchMedia("(orientation: portrait)").addEventListener("change", () => {
    checkOrientation();
});

/**
 * Calls checkOrientation when the DOM content has fully loaded.
 *
 * @event window#DOMContentLoaded
 * @type {function}
 * 
 * @returns {void} This function does not return a value.
 */
window.addEventListener('DOMContentLoaded', checkOrientation);