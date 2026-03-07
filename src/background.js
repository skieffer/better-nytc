const browser = require("webextension-polyfill");

async function showOnboarding() {
    //console.log('Show onboarding...');
    // If installing the extension for the first time, user should see the options page.
    await browser.storage.local.set({isOnboarding: true});
    browser.runtime.openOptionsPage();
}

async function showUpboarding(previousVersion) {
    //console.log('Show upboarding...', 'Previous version was:', previousVersion);

    // At this time (we are now releasing v1.4), only when upgrading from a version prior
    // to 1.4 should users be actively shown the options page.
    // In general, we should only show it on upgrades that introduce new options.
    const numericPrevVers = previousVersion.split('.').slice(0, 2).map(e => +e);
    const shouldShowOptionsPage = numericPrevVers < [1, 4];

    await browser.storage.local.set({isUpboarding: shouldShowOptionsPage});
    browser.runtime.openOptionsPage();
}

async function startup() {
    browser.runtime.onInstalled.addListener(async ({ reason, previousVersion, temporary }) => {
        //if (temporary) return; // Uncomment to skip during development
        switch (reason) {
            case "install":
            {
                await showOnboarding();
            }
                break;
            case "update":
            {
                await showUpboarding(previousVersion);
            }
                break;
        }
    });
}

startup();
