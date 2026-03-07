const browser = require("webextension-polyfill");
import { setupDarkModeForExt } from "simple-dark-mode-toggle";

function detectGame() {
    return document.querySelector('.pz-game-title').innerText;
}

const toggleID = 'betternytc-dark-mode-toggle';

async function setupToggle(gameTitle) {
    // In case the extension was reloaded, first remove any existing toggle buttons
    const existingToggles = document.querySelectorAll('#' + toggleID);
    for (const t of existingToggles) {
        t.remove();
    }

    // Form and add the toggle button
    const darkModeElt = document.createElement('div');
    darkModeElt.setAttribute('id', toggleID)

    const gameClassName = gameTitle.replaceAll(' ', '_');
    darkModeElt.classList.add(gameClassName);

    const gameWrapper = document.querySelector('.pz-game-wrapper');
    const parent = gameWrapper.parentNode;
    parent.insertBefore(darkModeElt, gameWrapper);

    await setupDarkModeForExt(darkModeElt, {
        storage: 'local',
        storageName: gameTitle + ' DM',
        darkByDefault: false,
    });
}

async function activateToggle() {
    const gameTitle = detectGame();
    await setupToggle(gameTitle);
}

async function startup() {
    const options = await browser.storage.local.get({
        activateOtherGamesDarkModeToggle: false,
    });
    const doActivate = options.activateOtherGamesDarkModeToggle;
    if (doActivate) {
        activateToggle();
    }
}

startup();
