const browser = require("webextension-polyfill");

async function startup() {

    const keys = {
        isOnboarding: false,
        isUpboarding: false,
    };
    const settings = await browser.storage.local.get(keys);
    // Set these keys to false now, so that the action is not repeated.
    //console.log('keys', keys);
    await browser.storage.local.set(keys);
    //console.log('settings', settings);

    const activateOtherGamesDarkModeToggle = 'activateOtherGamesDarkModeToggle';

    // Pre-populate elements with existing settings
    const existingSettings = await browser.storage.local.get({
        activateOtherGamesDarkModeToggle: false,
    });
    document.querySelector('#otherGamesDarkMode input').checked = existingSettings[activateOtherGamesDarkModeToggle];

    // Activate elements
    document.querySelector('#otherGamesDarkMode').addEventListener('change', async event => {
        //console.log('checkbox changed', event);
        const isChecked = event.target.checked;
        await browser.storage.local.set({
            activateOtherGamesDarkModeToggle: isChecked,
        });
    });

}

startup();
