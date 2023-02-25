const BETTER_NYTC_DATA = {
  darkMode: false,
  redPencil: false,
  useCapsLock: false,
  controlPencilWithShift: true,
  shiftCounter: 0,
  shiftTimeout: null,
  /* When the page loads, we don't know if caps lock is initially active or not.
   * In all browsers, we can find out when the user first types a letter, without holding shift.
   * In Chrome, we also find out as soon as caps lock is pressed (since keyup/keydown disambiguates).
   */
  weThinkCapsLockIsActive: false,
};

const SELECTORS = {
  pauseButton: '.xwd__timer--button > button:nth-child(1)',
  continueButton: '.pz-moment__button',
  cPanelSecondCol: 'div.xwd__settings-modal--column:nth-child(2)',
  pencilButtonAnyState: '.xwd__toolbar_icon--pencil, .xwd__toolbar_icon--pencil-active',
  pencilButtonActive: '.xwd__toolbar_icon--pencil-active',
  pencilButtonInactive: '.xwd__toolbar_icon--pencil',
  puzzleRoot: '#pz-game-root',
  modalZone: '#portal-game-modals',
  settingsPanel: '#settings-panel',
};

function storeSettings() {
  const keys = {
    darkMode: BETTER_NYTC_DATA.darkMode,
    redPencil: BETTER_NYTC_DATA.redPencil,
    useCapsLock: BETTER_NYTC_DATA.useCapsLock,
  };
  return chrome ?
      new Promise(resolve => chrome.storage.local.set(keys, resolve)) :
      browser.storage.local.set(keys);
}

function loadSettings() {
  const keys = {
    darkMode: false,
    redPencil: false,
    useCapsLock: false,
  };
  return chrome ?
      new Promise(resolve => chrome.storage.local.get(keys, resolve)) :
      browser.storage.local.get(keys);
}

/* Set attributes on a document element.
 *
 * elt: document element
 * attrs: array of pairs [attr_name, attr_value]
 */
function setAttrsOnElement(elt, attrs) {
  for (let [name, value] of attrs) {
    elt.setAttribute(name, value);
  }
}

/* Make a document element of a given type, with an
 * array of classes, and a set of attributes (array of pairs).
 * Optionally, append a text child.
 *
 * type: required
 * classes, attrs, textContents: optional
 */
function makeDocElt({type, classes, attrs, textContents}) {
  const elt = document.createElement(type);
  if (classes) {
    elt.classList.add(...classes);
  }
  if (attrs) {
    setAttrsOnElement(elt, attrs);
  }
  if (textContents) {
    elt.appendChild(document.createTextNode(textContents));
  }
  return elt;
}

/* Build a checkbox for the control panel.
 */
function makeControlsCheckbox({name, checked, text, onclick}) {
  const label = makeDocElt({type: 'label'});
  const attrs = [
    ['type', 'checkbox'],
    ['name', name],
    ['tabIndex', 0],
    ['readonly', ''],
    ['value', ''],
  ];
  if (checked) {
    attrs.push(['checked', '']);
  }
  const input = makeDocElt({type: 'input', attrs: attrs});
  input.addEventListener('change', onclick);
  const span = makeDocElt({type: 'span', textContents: text});
  label.appendChild(input);
  label.appendChild(span);
  return label;
}

/* Given the desired column in the control panel, add our controls section to it.
 */
function addControlsSection(column) {
  const section = makeDocElt({
    type: 'section',
    classes: ['xwd__settings-modal--section'],
  });
  const header = makeDocElt({
    type: 'header',
    classes: ['xwd__settings-modal--heading'],
    textContents: 'Better NYTC',
  });
  section.appendChild(header);
  const inset = makeDocElt({
    type: 'div',
    classes: ['xwd__settings-modal--inset'],
  });
  section.appendChild(inset);
  inset.appendChild(makeControlsCheckbox({
    name: 'betterNytcDarkMode',
    checked: BETTER_NYTC_DATA.darkMode,
    text: 'Dark mode',
    onclick: event => { setDarkMode(event.target.checked); },
  }));
  inset.appendChild(makeControlsCheckbox({
    name: 'betterNytcRedPencil',
    checked: BETTER_NYTC_DATA.redPencil,
    text: 'Red pencil',
    onclick: event => { setRedPencil(event.target.checked); },
  }));
  inset.appendChild(makeControlsCheckbox({
    name: 'betterNytcUseCapsLock',
    checked: BETTER_NYTC_DATA.useCapsLock,
    text: 'Caps Lock activates pencil',
    onclick: event => { setUseCapsLock(event.target.checked); },
  }));
  column.appendChild(section);
}

// Whatever state the pencil is in, flip it.
function togglePencil() {
  const icon = document.querySelector(SELECTORS.pencilButtonAnyState);
  icon.click();
}

// Make pencil mode active.
function activatePencil() {
  const icon = document.querySelector(SELECTORS.pencilButtonInactive);
  if (icon) {
    icon.click();
  }
}

// Make pencil mode inactive.
function deactivatePencil() {
  const icon = document.querySelector(SELECTORS.pencilButtonActive);
  if (icon) {
    icon.click();
  }
}

// Flip our internal rep of whether caps lock is active
function toggleInternalCapsLock() {
  BETTER_NYTC_DATA.weThinkCapsLockIsActive = !BETTER_NYTC_DATA.weThinkCapsLockIsActive;
  syncPencilWithCapsLock();
}

// Internally mark caps lock as active.
function activateInternalCapsLock() {
  BETTER_NYTC_DATA.weThinkCapsLockIsActive = true;
  syncPencilWithCapsLock();
}

// Internally mark caps lock as inactive.
function deactivateInternalCapsLock() {
  BETTER_NYTC_DATA.weThinkCapsLockIsActive = false;
  syncPencilWithCapsLock();
}

// IF we're set to use caps lock to control pencil, then put them in sync.
function syncPencilWithCapsLock() {
  if (BETTER_NYTC_DATA.useCapsLock) {
    if (BETTER_NYTC_DATA.weThinkCapsLockIsActive) {
      activatePencil();
    } else {
      deactivatePencil();
    }
  }
}

// Pass a key event. We return true if this event shows that caps lock is active.
function eventShowsActualCapsLock(e) {
  const k = e.key;
  return k === k.toUpperCase() && k !== k.toLowerCase() && !e.shiftKey;
}

/* Key handler for events taking place in the puzzle area.
 */
function puzzleAreaKeyEvent(e) {
  // Detect actual caps lock:
  if (eventShowsActualCapsLock(e)) {
    activateInternalCapsLock();
  }
  // Control pencil with shift:
  if (BETTER_NYTC_DATA.controlPencilWithShift && e.key === "Shift") {
    // We count all key-downs and key-ups of the shift key, but reset the counter if
    // no signal for 160ms. This means a double-tap achieved within 640ms raises the
    // counter to 4.
    window.clearTimeout(BETTER_NYTC_DATA.shiftTimeout);
    BETTER_NYTC_DATA.shiftTimeout = window.setTimeout(() => {
      BETTER_NYTC_DATA.shiftCounter = 0;
    }, 160);
    BETTER_NYTC_DATA.shiftCounter++;
    // Slow use of shift key simply toggles both on key-down and key-up.
    // This means holding shift achieves a temporary toggle.
    // But if the counter reaches 4, the first 3 toggles go through and the 4th is ignored.
    // The net effect is that the writing tool is switched and stays switched.
    // Alternatively, if the user wants caps lock (instead of double-shift) to be what
    // toggles permanent pencil mode, then we disregard the counter here.
    if (BETTER_NYTC_DATA.useCapsLock || BETTER_NYTC_DATA.shiftCounter < 4) {
      togglePencil();
    }
  }
}

function docKeyDown(e) {
  // Pause/Unpause on Alt-P
  if (e.code === "KeyP" && e.altKey) {
    const continueButton = getContinueButton();
    if (continueButton) {
      continueButton.click();
    } else {
      document.querySelector(SELECTORS.pauseButton).click();
    }
  }
  // Caps lock
  if (e.code === "CapsLock") {
    /* Chrome has the nice feature that when caps lock is activated, there is
     * only a keydown event (no keyup), while on deactivation it is the opposite,
     * i.e. only a keyup (no keydown). It is essentially like one long keypress.
     * Unfortunately, this is not the case in Firefox. There, both presses simply
     * result in a keydown event.
     */
    if (window.chrome) {
      activateInternalCapsLock();
    } else {
      toggleInternalCapsLock();
    }
  }
}

function docKeyUp(e) {
  if (window.chrome && e.code === "CapsLock") {
    deactivateInternalCapsLock();
  }
}

/* Set dark mode graphically, and also record the setting.
 */
function setDarkMode(b) {
  const cl = document.querySelector('html').classList;
  if (b) {
    cl.add('darkmode');
  } else {
    cl.remove('darkmode');
  }
  BETTER_NYTC_DATA.darkMode = b;
  storeSettings();
}

/* Set red pencil graphically, and also record the setting.
 */
function setRedPencil(b) {
  const cl = document.querySelector('html').classList;
  if (b) {
    cl.add('redpencil');
  } else {
    cl.remove('redpencil');
  }
  BETTER_NYTC_DATA.redPencil = b;
  storeSettings();
}

/* Set control via caps lock, and also record the setting.
 */
function setUseCapsLock(b) {
  BETTER_NYTC_DATA.useCapsLock = b;
  storeSettings();
  syncPencilWithCapsLock();
}

function getContinueButton() {
  return document.querySelector(SELECTORS.continueButton);
}

async function startup() {
  // Global key listeners
  document.addEventListener('keydown', docKeyDown);
  document.addEventListener('keyup', docKeyUp);

  // Tool tip "Alt-P" for pause/unpause.
  // Seem to need a delay in Firefox (but not in Chrome).
  setTimeout(() => {
    const pauseButton = document.querySelector(SELECTORS.pauseButton);
    pauseButton.setAttribute('title', 'Alt-P');
  }, 3000);

  // Set up key listening so that shift key controls pencil mode.
  const board = document.querySelector(SELECTORS.puzzleRoot);
  board.addEventListener('keydown', puzzleAreaKeyEvent);
  board.addEventListener('keyup', puzzleAreaKeyEvent);

  // Watch for the control panel modal. It is regenerated each time the user goes into
  // settings, so we need to add our controls each time.
  const modalZone = document.querySelector(SELECTORS.modalZone);
  const observer = new MutationObserver(info => {
    const panel = document.querySelector(SELECTORS.settingsPanel);
    if (panel) {
      const colTwo = document.querySelector(SELECTORS.cPanelSecondCol);
      addControlsSection(colTwo);
    }
  });
  observer.observe(modalZone, {childList: true});

  // Restore settings from last time (or use defaults).
  const settings = await loadSettings();
  setDarkMode(settings.darkMode);
  setRedPencil(settings.redPencil);
  setUseCapsLock(settings.useCapsLock);
}

startup();
