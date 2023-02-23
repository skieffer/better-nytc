const BETTER_NYTC_DATA = {
  darkMode: false,
  redPencil: false,
  controlPencilWithShift: true,
  shiftCounter: 0,
  shiftTimeout: null,
};

const SELECTORS = {
  pauseButton: '.xwd__timer--button > button:nth-child(1)',
  continueButton: '.pz-moment__button',
  cPanelSecondCol: 'div.xwd__settings-modal--column:nth-child(2)',
  pencilButtonAnyState: '.xwd__toolbar_icon--pencil, .xwd__toolbar_icon--pencil-active',
  puzzleRoot: '#pz-game-root',
  modalZone: '#portal-game-modals',
  settingsPanel: '#settings-panel',
};

function storeSettings() {
  const keys = {
    darkMode: BETTER_NYTC_DATA.darkMode,
    redPencil: BETTER_NYTC_DATA.redPencil,
  };
  return chrome ?
      new Promise(resolve => chrome.storage.local.set(keys, resolve)) :
      browser.storage.local.set(keys);
}

function loadSettings() {
  const keys = {
    darkMode: false,
    redPencil: false,
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
  column.appendChild(section);
}

/* Key handler that achieves the activation of pencil mode via the shift key.
 */
function handleKeyEvent(e) {
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
    if (BETTER_NYTC_DATA.shiftCounter < 4) {
      const icon = document.querySelector(SELECTORS.pencilButtonAnyState);
      icon.click();
    }
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

function getContinueButton() {
  return document.querySelector(SELECTORS.continueButton);
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
}


async function startup() {
  // Global key listeners
  document.addEventListener('keydown', docKeyDown);

  // Tool tip "Alt-P" for pause/unpause.
  // Seem to need a delay in Firefox (but not in Chrome).
  setTimeout(() => {
    const pauseButton = document.querySelector(SELECTORS.pauseButton);
    pauseButton.setAttribute('title', 'Alt-P');
  }, 3000);

  // Set up key listening so that shift key controls pencil mode.
  const board = document.querySelector(SELECTORS.puzzleRoot);
  board.addEventListener('keydown', handleKeyEvent);
  board.addEventListener('keyup', handleKeyEvent);

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
}

startup();
