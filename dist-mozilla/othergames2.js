/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/simple-dark-mode-toggle/lib/main.js":
/*!**********************************************************!*\
  !*** ./node_modules/simple-dark-mode-toggle/lib/main.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports) {


/* simple-dark-mode-toggle
 * Copyright (c) 2024 Steve Kieffer
 * SPDX-License-Identifier: MIT
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExtensionDarkModeManager = exports.DarkModeManager = void 0;
exports.setupDarkMode = setupDarkMode;
exports.setupDarkModeForExt = setupDarkModeForExt;
/* This is a convenience function to set up and activate dark mode.
 * It is for use in page scripts. For content scripts, see `setupDarkModeForExt()`.
 *
 * toggleElement: The DOM element you want to be the dark mode toggle button.
 *     Generally this should be some empty div or span. The manager will only
 *     write a sun or moon character into it, to show the current mode.
 *     You are encouraged to set up your own CSS to set the element's font size,
 *     padding, margins, etc. This is deliberately left open, for flexibility.
 * options: See above.
 */
function setupDarkMode(toggleElement, options) {
    var mgr = new DarkModeManager(toggleElement, options);
    mgr.restore();
    mgr.activate();
    return mgr;
}
/* This is a convenience function to set up and activate dark mode.
 * It is for use in content scripts. For page scripts, see `setupDarkMode()`.
 *
 * toggleElement: The DOM element you want to be the dark mode toggle button.
 *     Generally this should be some empty div or span. The manager will only
 *     write a sun or moon character into it, to show the current mode.
 *     You are encouraged to set up your own CSS to set the element's font size,
 *     padding, margins, etc. This is deliberately left open, for flexibility.
 * options: See above.
 */
function setupDarkModeForExt(toggleElement, options) {
    return __awaiter(this, void 0, void 0, function () {
        var mgr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = options || {};
                    options.storage = 'ext-' + (options.storage || 'none');
                    mgr = new ExtensionDarkModeManager(toggleElement, options);
                    return [4 /*yield*/, mgr.restore()];
                case 1:
                    _a.sent();
                    mgr.activate();
                    return [2 /*return*/, mgr];
            }
        });
    });
}
var storageTypes = {
    local: 'local',
    session: 'session',
    extLocal: 'ext-local',
    extSession: 'ext-session',
};
/* Wrapper class providing an abstraction layer over the various storage options provided
 * by the web browser.
 *
 * Specifically, an instance of this class can represent any of the following storages:
 *   - window.localStorage
 *   - window.sessionStorage
 *   - (browser|chrome).storage.local
 *   - (browser|chrome).storage.session
 */
var AbstractStorage = /** @class */ (function () {
    /* storageType must be one of: 'local', 'session', 'ext-local', 'ext-session'.
     *   The first two use the local and session storages of the window object; the last two
     *   use those of the extension (when working within a browser extension).
     */
    function AbstractStorage(storageType) {
        this.storageType = storageType;
        this.inChrome = typeof chrome !== 'undefined';
    }
    AbstractStorage.prototype.getItem = function (key) {
        switch (this.storageType) {
            case storageTypes.local:
                return window.localStorage.getItem(key);
            case storageTypes.session:
                return window.sessionStorage.getItem(key);
            default:
                return null;
        }
    };
    AbstractStorage.prototype.getItemAsync = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var results, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.storageType;
                        switch (_a) {
                            case storageTypes.extLocal: return [3 /*break*/, 1];
                            case storageTypes.extSession: return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, (this.inChrome ?
                            new Promise(function (resolve) { return chrome.storage.local.get(key, resolve); }) :
                            browser.storage.local.get(key))];
                    case 2:
                        results = _b.sent();
                        return [2 /*return*/, results[key]];
                    case 3: return [4 /*yield*/, (this.inChrome ?
                            new Promise(function (resolve) { return chrome.storage.session.get(key, resolve); }) :
                            browser.storage.session.get(key))];
                    case 4:
                        results = _b.sent();
                        return [2 /*return*/, results[key]];
                    case 5: return [2 /*return*/, null];
                }
            });
        });
    };
    AbstractStorage.prototype.setItem = function (key, value) {
        switch (this.storageType) {
            case storageTypes.local:
                return window.localStorage.setItem(key, value);
            case storageTypes.session:
                return window.sessionStorage.setItem(key, value);
            default:
                return null;
        }
    };
    AbstractStorage.prototype.setItemAsync = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var keys;
            var _a;
            return __generator(this, function (_b) {
                keys = (_a = {}, _a[key] = value, _a);
                switch (this.storageType) {
                    case storageTypes.extLocal:
                        return [2 /*return*/, this.inChrome ?
                                new Promise(function (resolve) { return chrome.storage.local.set(keys, function () {
                                    resolve(null);
                                }); }) :
                                browser.storage.local.set(keys)];
                    case storageTypes.extSession:
                        return [2 /*return*/, this.inChrome ?
                                new Promise(function (resolve) { return chrome.storage.session.set(keys, function () {
                                    resolve(null);
                                }); }) :
                                browser.storage.session.set(keys)];
                    default:
                        return [2 /*return*/, null];
                }
                return [2 /*return*/];
            });
        });
    };
    return AbstractStorage;
}());
/* Abstract base class for the dark mode managers.
 */
var BaseDarkModeManager = /** @class */ (function () {
    function BaseDarkModeManager(toggleElement, options) {
        var _a = options || {}, _b = _a.classElement, classElement = _b === void 0 ? document.body : _b, _c = _a.darkClassName, darkClassName = _c === void 0 ? 'dark-mode' : _c, _d = _a.title, title = _d === void 0 ? 'Light/Dark Mode' : _d, _e = _a.storage, storage = _e === void 0 ? 'local' : _e, _f = _a.storageName, storageName = _f === void 0 ? 'dark-mode' : _f, _g = _a.darkByDefault, darkByDefault = _g === void 0 ? true : _g;
        this.toggleElement = toggleElement;
        this.classElement = classElement;
        this.darkClassName = darkClassName;
        this.title = title;
        this.storage = new AbstractStorage(storage);
        this.storageName = storageName;
        this.darkByDefault = darkByDefault;
    }
    BaseDarkModeManager.prototype._activate = function () {
        this.toggleElement.style.cursor = 'pointer';
        this.toggleElement.style.userSelect = 'none';
        this.toggleElement.title = this.title;
    };
    BaseDarkModeManager.prototype._toggle = function () {
        var dark = this.darkByDefault;
        var currentValue = this.toggleElement.dataset.dark;
        if (currentValue) {
            dark = !+currentValue;
        }
        return dark;
    };
    BaseDarkModeManager.prototype._setDarkMode = function (dark) {
        if (dark) {
            this.classElement.classList.add(this.darkClassName);
            this.toggleElement.dataset.dark = '1';
            this.toggleElement.innerHTML = '&#x263e;'; // moon
        }
        else {
            this.classElement.classList.remove(this.darkClassName);
            this.toggleElement.dataset.dark = '0';
            this.toggleElement.innerHTML = '&#x263c;'; // sun
        }
    };
    return BaseDarkModeManager;
}());
/* Dark mode manager for use in ordinary page scripts (*not* in browser extensions).
 *
 * Uses the synchronous storage classes available in the window.
 */
var DarkModeManager = /** @class */ (function (_super) {
    __extends(DarkModeManager, _super);
    function DarkModeManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DarkModeManager.prototype.activate = function () {
        var _this = this;
        this._activate();
        this.toggleElement.onclick = function (e) {
            _this.toggle();
        };
    };
    /* Restore the previous setting from localStorage (or default).
     */
    DarkModeManager.prototype.restore = function () {
        var storedValue = this.storage.getItem(this.storageName);
        var dark = this.darkByDefault;
        if (storedValue) {
            dark = !!+storedValue;
        }
        this.setDarkMode(dark);
    };
    /* Switch to the opposite setting currently expressed by the toggle element.
     */
    DarkModeManager.prototype.toggle = function () {
        var dark = this._toggle();
        this.setDarkMode(dark);
    };
    DarkModeManager.prototype.setDarkMode = function (dark) {
        this._setDarkMode(dark);
        this.storage.setItem(this.storageName, this.toggleElement.dataset.dark);
    };
    return DarkModeManager;
}(BaseDarkModeManager));
exports.DarkModeManager = DarkModeManager;
/* Dark mode manager for use in browser extension content scripts.
 *
 * Uses the asynchronous storage classes available to browser extensions.
 */
var ExtensionDarkModeManager = /** @class */ (function (_super) {
    __extends(ExtensionDarkModeManager, _super);
    function ExtensionDarkModeManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtensionDarkModeManager.prototype.activate = function () {
        var _this = this;
        this._activate();
        this.toggleElement.onclick = function (e) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toggle()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
    };
    /* Restore the previous setting from localStorage (or default).
     */
    ExtensionDarkModeManager.prototype.restore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var storedValue, dark;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.getItemAsync(this.storageName)];
                    case 1:
                        storedValue = _a.sent();
                        dark = this.darkByDefault;
                        if (storedValue) {
                            dark = !!+storedValue;
                        }
                        return [4 /*yield*/, this.setDarkMode(dark)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /* Switch to the opposite setting currently expressed by the toggle element.
     */
    ExtensionDarkModeManager.prototype.toggle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dark;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dark = this._toggle();
                        return [4 /*yield*/, this.setDarkMode(dark)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ExtensionDarkModeManager.prototype.setDarkMode = function (dark) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._setDarkMode(dark);
                        return [4 /*yield*/, this.storage.setItemAsync(this.storageName, this.toggleElement.dataset.dark)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ExtensionDarkModeManager;
}(BaseDarkModeManager));
exports.ExtensionDarkModeManager = ExtensionDarkModeManager;
//# sourceMappingURL=main.js.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/othergames2.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var simple_dark_mode_toggle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! simple-dark-mode-toggle */ "./node_modules/simple-dark-mode-toggle/lib/main.js");
/* harmony import */ var simple_dark_mode_toggle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(simple_dark_mode_toggle__WEBPACK_IMPORTED_MODULE_0__);


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

    await (0,simple_dark_mode_toggle__WEBPACK_IMPORTED_MODULE_0__.setupDarkModeForExt)(darkModeElt, {
        storage: 'local',
        storageName: gameTitle + ' DM',
        darkByDefault: false,
    });
}

async function startup() {
    const gameTitle = detectGame();
    await setupToggle(gameTitle);
}

startup();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOOEQ7O0FBRTlEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFVBQVUsNEVBQW1CO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JldHRlci1ueXRjLy4vbm9kZV9tb2R1bGVzL3NpbXBsZS1kYXJrLW1vZGUtdG9nZ2xlL2xpYi9tYWluLmpzIiwid2VicGFjazovL2JldHRlci1ueXRjL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JldHRlci1ueXRjL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JldHRlci1ueXRjL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iZXR0ZXItbnl0Yy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JldHRlci1ueXRjL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmV0dGVyLW55dGMvLi9zcmMvb3RoZXJnYW1lczIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG4vKiBzaW1wbGUtZGFyay1tb2RlLXRvZ2dsZVxuICogQ29weXJpZ2h0IChjKSAyMDI0IFN0ZXZlIEtpZWZmZXJcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBNSVRcbiAqL1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEl0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKTtcbiAgICByZXR1cm4gZy5uZXh0ID0gdmVyYigwKSwgZ1tcInRocm93XCJdID0gdmVyYigxKSwgZ1tcInJldHVyblwiXSA9IHZlcmIoMiksIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkV4dGVuc2lvbkRhcmtNb2RlTWFuYWdlciA9IGV4cG9ydHMuRGFya01vZGVNYW5hZ2VyID0gdm9pZCAwO1xuZXhwb3J0cy5zZXR1cERhcmtNb2RlID0gc2V0dXBEYXJrTW9kZTtcbmV4cG9ydHMuc2V0dXBEYXJrTW9kZUZvckV4dCA9IHNldHVwRGFya01vZGVGb3JFeHQ7XG4vKiBUaGlzIGlzIGEgY29udmVuaWVuY2UgZnVuY3Rpb24gdG8gc2V0IHVwIGFuZCBhY3RpdmF0ZSBkYXJrIG1vZGUuXG4gKiBJdCBpcyBmb3IgdXNlIGluIHBhZ2Ugc2NyaXB0cy4gRm9yIGNvbnRlbnQgc2NyaXB0cywgc2VlIGBzZXR1cERhcmtNb2RlRm9yRXh0KClgLlxuICpcbiAqIHRvZ2dsZUVsZW1lbnQ6IFRoZSBET00gZWxlbWVudCB5b3Ugd2FudCB0byBiZSB0aGUgZGFyayBtb2RlIHRvZ2dsZSBidXR0b24uXG4gKiAgICAgR2VuZXJhbGx5IHRoaXMgc2hvdWxkIGJlIHNvbWUgZW1wdHkgZGl2IG9yIHNwYW4uIFRoZSBtYW5hZ2VyIHdpbGwgb25seVxuICogICAgIHdyaXRlIGEgc3VuIG9yIG1vb24gY2hhcmFjdGVyIGludG8gaXQsIHRvIHNob3cgdGhlIGN1cnJlbnQgbW9kZS5cbiAqICAgICBZb3UgYXJlIGVuY291cmFnZWQgdG8gc2V0IHVwIHlvdXIgb3duIENTUyB0byBzZXQgdGhlIGVsZW1lbnQncyBmb250IHNpemUsXG4gKiAgICAgcGFkZGluZywgbWFyZ2lucywgZXRjLiBUaGlzIGlzIGRlbGliZXJhdGVseSBsZWZ0IG9wZW4sIGZvciBmbGV4aWJpbGl0eS5cbiAqIG9wdGlvbnM6IFNlZSBhYm92ZS5cbiAqL1xuZnVuY3Rpb24gc2V0dXBEYXJrTW9kZSh0b2dnbGVFbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdmFyIG1nciA9IG5ldyBEYXJrTW9kZU1hbmFnZXIodG9nZ2xlRWxlbWVudCwgb3B0aW9ucyk7XG4gICAgbWdyLnJlc3RvcmUoKTtcbiAgICBtZ3IuYWN0aXZhdGUoKTtcbiAgICByZXR1cm4gbWdyO1xufVxuLyogVGhpcyBpcyBhIGNvbnZlbmllbmNlIGZ1bmN0aW9uIHRvIHNldCB1cCBhbmQgYWN0aXZhdGUgZGFyayBtb2RlLlxuICogSXQgaXMgZm9yIHVzZSBpbiBjb250ZW50IHNjcmlwdHMuIEZvciBwYWdlIHNjcmlwdHMsIHNlZSBgc2V0dXBEYXJrTW9kZSgpYC5cbiAqXG4gKiB0b2dnbGVFbGVtZW50OiBUaGUgRE9NIGVsZW1lbnQgeW91IHdhbnQgdG8gYmUgdGhlIGRhcmsgbW9kZSB0b2dnbGUgYnV0dG9uLlxuICogICAgIEdlbmVyYWxseSB0aGlzIHNob3VsZCBiZSBzb21lIGVtcHR5IGRpdiBvciBzcGFuLiBUaGUgbWFuYWdlciB3aWxsIG9ubHlcbiAqICAgICB3cml0ZSBhIHN1biBvciBtb29uIGNoYXJhY3RlciBpbnRvIGl0LCB0byBzaG93IHRoZSBjdXJyZW50IG1vZGUuXG4gKiAgICAgWW91IGFyZSBlbmNvdXJhZ2VkIHRvIHNldCB1cCB5b3VyIG93biBDU1MgdG8gc2V0IHRoZSBlbGVtZW50J3MgZm9udCBzaXplLFxuICogICAgIHBhZGRpbmcsIG1hcmdpbnMsIGV0Yy4gVGhpcyBpcyBkZWxpYmVyYXRlbHkgbGVmdCBvcGVuLCBmb3IgZmxleGliaWxpdHkuXG4gKiBvcHRpb25zOiBTZWUgYWJvdmUuXG4gKi9cbmZ1bmN0aW9uIHNldHVwRGFya01vZGVGb3JFeHQodG9nZ2xlRWxlbWVudCwgb3B0aW9ucykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG1ncjtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc3RvcmFnZSA9ICdleHQtJyArIChvcHRpb25zLnN0b3JhZ2UgfHwgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgbWdyID0gbmV3IEV4dGVuc2lvbkRhcmtNb2RlTWFuYWdlcih0b2dnbGVFbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgbWdyLnJlc3RvcmUoKV07XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIG1nci5hY3RpdmF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgbWdyXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG52YXIgc3RvcmFnZVR5cGVzID0ge1xuICAgIGxvY2FsOiAnbG9jYWwnLFxuICAgIHNlc3Npb246ICdzZXNzaW9uJyxcbiAgICBleHRMb2NhbDogJ2V4dC1sb2NhbCcsXG4gICAgZXh0U2Vzc2lvbjogJ2V4dC1zZXNzaW9uJyxcbn07XG4vKiBXcmFwcGVyIGNsYXNzIHByb3ZpZGluZyBhbiBhYnN0cmFjdGlvbiBsYXllciBvdmVyIHRoZSB2YXJpb3VzIHN0b3JhZ2Ugb3B0aW9ucyBwcm92aWRlZFxuICogYnkgdGhlIHdlYiBicm93c2VyLlxuICpcbiAqIFNwZWNpZmljYWxseSwgYW4gaW5zdGFuY2Ugb2YgdGhpcyBjbGFzcyBjYW4gcmVwcmVzZW50IGFueSBvZiB0aGUgZm9sbG93aW5nIHN0b3JhZ2VzOlxuICogICAtIHdpbmRvdy5sb2NhbFN0b3JhZ2VcbiAqICAgLSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2VcbiAqICAgLSAoYnJvd3NlcnxjaHJvbWUpLnN0b3JhZ2UubG9jYWxcbiAqICAgLSAoYnJvd3NlcnxjaHJvbWUpLnN0b3JhZ2Uuc2Vzc2lvblxuICovXG52YXIgQWJzdHJhY3RTdG9yYWdlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qIHN0b3JhZ2VUeXBlIG11c3QgYmUgb25lIG9mOiAnbG9jYWwnLCAnc2Vzc2lvbicsICdleHQtbG9jYWwnLCAnZXh0LXNlc3Npb24nLlxuICAgICAqICAgVGhlIGZpcnN0IHR3byB1c2UgdGhlIGxvY2FsIGFuZCBzZXNzaW9uIHN0b3JhZ2VzIG9mIHRoZSB3aW5kb3cgb2JqZWN0OyB0aGUgbGFzdCB0d29cbiAgICAgKiAgIHVzZSB0aG9zZSBvZiB0aGUgZXh0ZW5zaW9uICh3aGVuIHdvcmtpbmcgd2l0aGluIGEgYnJvd3NlciBleHRlbnNpb24pLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEFic3RyYWN0U3RvcmFnZShzdG9yYWdlVHlwZSkge1xuICAgICAgICB0aGlzLnN0b3JhZ2VUeXBlID0gc3RvcmFnZVR5cGU7XG4gICAgICAgIHRoaXMuaW5DaHJvbWUgPSB0eXBlb2YgY2hyb21lICE9PSAndW5kZWZpbmVkJztcbiAgICB9XG4gICAgQWJzdHJhY3RTdG9yYWdlLnByb3RvdHlwZS5nZXRJdGVtID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RvcmFnZVR5cGUpIHtcbiAgICAgICAgICAgIGNhc2Ugc3RvcmFnZVR5cGVzLmxvY2FsOlxuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICAgICAgICAgIGNhc2Ugc3RvcmFnZVR5cGVzLnNlc3Npb246XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBYnN0cmFjdFN0b3JhZ2UucHJvdG90eXBlLmdldEl0ZW1Bc3luYyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdHMsIF9hO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSB0aGlzLnN0b3JhZ2VUeXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugc3RvcmFnZVR5cGVzLmV4dExvY2FsOiByZXR1cm4gWzMgLypicmVhayovLCAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHN0b3JhZ2VUeXBlcy5leHRTZXNzaW9uOiByZXR1cm4gWzMgLypicmVhayovLCAzXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDVdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbNCAvKnlpZWxkKi8sICh0aGlzLmluQ2hyb21lID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXR1cm4gY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KGtleSwgcmVzb2x2ZSk7IH0pIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicm93c2VyLnN0b3JhZ2UubG9jYWwuZ2V0KGtleSkpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXN1bHRzW2tleV1dO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IHJldHVybiBbNCAvKnlpZWxkKi8sICh0aGlzLmluQ2hyb21lID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXR1cm4gY2hyb21lLnN0b3JhZ2Uuc2Vzc2lvbi5nZXQoa2V5LCByZXNvbHZlKTsgfSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyb3dzZXIuc3RvcmFnZS5zZXNzaW9uLmdldChrZXkpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgcmVzdWx0c1trZXldXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OiByZXR1cm4gWzIgLypyZXR1cm4qLywgbnVsbF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQWJzdHJhY3RTdG9yYWdlLnByb3RvdHlwZS5zZXRJdGVtID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0b3JhZ2VUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIHN0b3JhZ2VUeXBlcy5sb2NhbDpcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgY2FzZSBzdG9yYWdlVHlwZXMuc2Vzc2lvbjpcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBYnN0cmFjdFN0b3JhZ2UucHJvdG90eXBlLnNldEl0ZW1Bc3luYyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBrZXlzO1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgIGtleXMgPSAoX2EgPSB7fSwgX2Fba2V5XSA9IHZhbHVlLCBfYSk7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLnN0b3JhZ2VUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugc3RvcmFnZVR5cGVzLmV4dExvY2FsOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMuaW5DaHJvbWUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXR1cm4gY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KGtleXMsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pOyB9KSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyb3dzZXIuc3RvcmFnZS5sb2NhbC5zZXQoa2V5cyldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHN0b3JhZ2VUeXBlcy5leHRTZXNzaW9uOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMuaW5DaHJvbWUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXR1cm4gY2hyb21lLnN0b3JhZ2Uuc2Vzc2lvbi5zZXQoa2V5cywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7IH0pIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJvd3Nlci5zdG9yYWdlLnNlc3Npb24uc2V0KGtleXMpXTtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBudWxsXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEFic3RyYWN0U3RvcmFnZTtcbn0oKSk7XG4vKiBBYnN0cmFjdCBiYXNlIGNsYXNzIGZvciB0aGUgZGFyayBtb2RlIG1hbmFnZXJzLlxuICovXG52YXIgQmFzZURhcmtNb2RlTWFuYWdlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCYXNlRGFya01vZGVNYW5hZ2VyKHRvZ2dsZUVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF9hID0gb3B0aW9ucyB8fCB7fSwgX2IgPSBfYS5jbGFzc0VsZW1lbnQsIGNsYXNzRWxlbWVudCA9IF9iID09PSB2b2lkIDAgPyBkb2N1bWVudC5ib2R5IDogX2IsIF9jID0gX2EuZGFya0NsYXNzTmFtZSwgZGFya0NsYXNzTmFtZSA9IF9jID09PSB2b2lkIDAgPyAnZGFyay1tb2RlJyA6IF9jLCBfZCA9IF9hLnRpdGxlLCB0aXRsZSA9IF9kID09PSB2b2lkIDAgPyAnTGlnaHQvRGFyayBNb2RlJyA6IF9kLCBfZSA9IF9hLnN0b3JhZ2UsIHN0b3JhZ2UgPSBfZSA9PT0gdm9pZCAwID8gJ2xvY2FsJyA6IF9lLCBfZiA9IF9hLnN0b3JhZ2VOYW1lLCBzdG9yYWdlTmFtZSA9IF9mID09PSB2b2lkIDAgPyAnZGFyay1tb2RlJyA6IF9mLCBfZyA9IF9hLmRhcmtCeURlZmF1bHQsIGRhcmtCeURlZmF1bHQgPSBfZyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9nO1xuICAgICAgICB0aGlzLnRvZ2dsZUVsZW1lbnQgPSB0b2dnbGVFbGVtZW50O1xuICAgICAgICB0aGlzLmNsYXNzRWxlbWVudCA9IGNsYXNzRWxlbWVudDtcbiAgICAgICAgdGhpcy5kYXJrQ2xhc3NOYW1lID0gZGFya0NsYXNzTmFtZTtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBuZXcgQWJzdHJhY3RTdG9yYWdlKHN0b3JhZ2UpO1xuICAgICAgICB0aGlzLnN0b3JhZ2VOYW1lID0gc3RvcmFnZU5hbWU7XG4gICAgICAgIHRoaXMuZGFya0J5RGVmYXVsdCA9IGRhcmtCeURlZmF1bHQ7XG4gICAgfVxuICAgIEJhc2VEYXJrTW9kZU1hbmFnZXIucHJvdG90eXBlLl9hY3RpdmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50b2dnbGVFbGVtZW50LnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgICAgdGhpcy50b2dnbGVFbGVtZW50LnN0eWxlLnVzZXJTZWxlY3QgPSAnbm9uZSc7XG4gICAgICAgIHRoaXMudG9nZ2xlRWxlbWVudC50aXRsZSA9IHRoaXMudGl0bGU7XG4gICAgfTtcbiAgICBCYXNlRGFya01vZGVNYW5hZ2VyLnByb3RvdHlwZS5fdG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGFyayA9IHRoaXMuZGFya0J5RGVmYXVsdDtcbiAgICAgICAgdmFyIGN1cnJlbnRWYWx1ZSA9IHRoaXMudG9nZ2xlRWxlbWVudC5kYXRhc2V0LmRhcms7XG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgIGRhcmsgPSAhK2N1cnJlbnRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGFyaztcbiAgICB9O1xuICAgIEJhc2VEYXJrTW9kZU1hbmFnZXIucHJvdG90eXBlLl9zZXREYXJrTW9kZSA9IGZ1bmN0aW9uIChkYXJrKSB7XG4gICAgICAgIGlmIChkYXJrKSB7XG4gICAgICAgICAgICB0aGlzLmNsYXNzRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuZGFya0NsYXNzTmFtZSk7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUVsZW1lbnQuZGF0YXNldC5kYXJrID0gJzEnO1xuICAgICAgICAgICAgdGhpcy50b2dnbGVFbGVtZW50LmlubmVySFRNTCA9ICcmI3gyNjNlOyc7IC8vIG1vb25cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5kYXJrQ2xhc3NOYW1lKTtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRWxlbWVudC5kYXRhc2V0LmRhcmsgPSAnMCc7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUVsZW1lbnQuaW5uZXJIVE1MID0gJyYjeDI2M2M7JzsgLy8gc3VuXG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBCYXNlRGFya01vZGVNYW5hZ2VyO1xufSgpKTtcbi8qIERhcmsgbW9kZSBtYW5hZ2VyIGZvciB1c2UgaW4gb3JkaW5hcnkgcGFnZSBzY3JpcHRzICgqbm90KiBpbiBicm93c2VyIGV4dGVuc2lvbnMpLlxuICpcbiAqIFVzZXMgdGhlIHN5bmNocm9ub3VzIHN0b3JhZ2UgY2xhc3NlcyBhdmFpbGFibGUgaW4gdGhlIHdpbmRvdy5cbiAqL1xudmFyIERhcmtNb2RlTWFuYWdlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRGFya01vZGVNYW5hZ2VyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIERhcmtNb2RlTWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBEYXJrTW9kZU1hbmFnZXIucHJvdG90eXBlLmFjdGl2YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9hY3RpdmF0ZSgpO1xuICAgICAgICB0aGlzLnRvZ2dsZUVsZW1lbnQub25jbGljayA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBfdGhpcy50b2dnbGUoKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIC8qIFJlc3RvcmUgdGhlIHByZXZpb3VzIHNldHRpbmcgZnJvbSBsb2NhbFN0b3JhZ2UgKG9yIGRlZmF1bHQpLlxuICAgICAqL1xuICAgIERhcmtNb2RlTWFuYWdlci5wcm90b3R5cGUucmVzdG9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHN0b3JlZFZhbHVlID0gdGhpcy5zdG9yYWdlLmdldEl0ZW0odGhpcy5zdG9yYWdlTmFtZSk7XG4gICAgICAgIHZhciBkYXJrID0gdGhpcy5kYXJrQnlEZWZhdWx0O1xuICAgICAgICBpZiAoc3RvcmVkVmFsdWUpIHtcbiAgICAgICAgICAgIGRhcmsgPSAhIStzdG9yZWRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldERhcmtNb2RlKGRhcmspO1xuICAgIH07XG4gICAgLyogU3dpdGNoIHRvIHRoZSBvcHBvc2l0ZSBzZXR0aW5nIGN1cnJlbnRseSBleHByZXNzZWQgYnkgdGhlIHRvZ2dsZSBlbGVtZW50LlxuICAgICAqL1xuICAgIERhcmtNb2RlTWFuYWdlci5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGFyayA9IHRoaXMuX3RvZ2dsZSgpO1xuICAgICAgICB0aGlzLnNldERhcmtNb2RlKGRhcmspO1xuICAgIH07XG4gICAgRGFya01vZGVNYW5hZ2VyLnByb3RvdHlwZS5zZXREYXJrTW9kZSA9IGZ1bmN0aW9uIChkYXJrKSB7XG4gICAgICAgIHRoaXMuX3NldERhcmtNb2RlKGRhcmspO1xuICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbSh0aGlzLnN0b3JhZ2VOYW1lLCB0aGlzLnRvZ2dsZUVsZW1lbnQuZGF0YXNldC5kYXJrKTtcbiAgICB9O1xuICAgIHJldHVybiBEYXJrTW9kZU1hbmFnZXI7XG59KEJhc2VEYXJrTW9kZU1hbmFnZXIpKTtcbmV4cG9ydHMuRGFya01vZGVNYW5hZ2VyID0gRGFya01vZGVNYW5hZ2VyO1xuLyogRGFyayBtb2RlIG1hbmFnZXIgZm9yIHVzZSBpbiBicm93c2VyIGV4dGVuc2lvbiBjb250ZW50IHNjcmlwdHMuXG4gKlxuICogVXNlcyB0aGUgYXN5bmNocm9ub3VzIHN0b3JhZ2UgY2xhc3NlcyBhdmFpbGFibGUgdG8gYnJvd3NlciBleHRlbnNpb25zLlxuICovXG52YXIgRXh0ZW5zaW9uRGFya01vZGVNYW5hZ2VyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhFeHRlbnNpb25EYXJrTW9kZU1hbmFnZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRXh0ZW5zaW9uRGFya01vZGVNYW5hZ2VyKCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIEV4dGVuc2lvbkRhcmtNb2RlTWFuYWdlci5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2FjdGl2YXRlKCk7XG4gICAgICAgIHRoaXMudG9nZ2xlRWxlbWVudC5vbmNsaWNrID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy50b2dnbGUoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7IH07XG4gICAgfTtcbiAgICAvKiBSZXN0b3JlIHRoZSBwcmV2aW91cyBzZXR0aW5nIGZyb20gbG9jYWxTdG9yYWdlIChvciBkZWZhdWx0KS5cbiAgICAgKi9cbiAgICBFeHRlbnNpb25EYXJrTW9kZU1hbmFnZXIucHJvdG90eXBlLnJlc3RvcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzdG9yZWRWYWx1ZSwgZGFyaztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zdG9yYWdlLmdldEl0ZW1Bc3luYyh0aGlzLnN0b3JhZ2VOYW1lKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlZFZhbHVlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGFyayA9IHRoaXMuZGFya0J5RGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdG9yZWRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhcmsgPSAhIStzdG9yZWRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuc2V0RGFya01vZGUoZGFyayldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyogU3dpdGNoIHRvIHRoZSBvcHBvc2l0ZSBzZXR0aW5nIGN1cnJlbnRseSBleHByZXNzZWQgYnkgdGhlIHRvZ2dsZSBlbGVtZW50LlxuICAgICAqL1xuICAgIEV4dGVuc2lvbkRhcmtNb2RlTWFuYWdlci5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZGFyaztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhcmsgPSB0aGlzLl90b2dnbGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuc2V0RGFya01vZGUoZGFyayldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRXh0ZW5zaW9uRGFya01vZGVNYW5hZ2VyLnByb3RvdHlwZS5zZXREYXJrTW9kZSA9IGZ1bmN0aW9uIChkYXJrKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NldERhcmtNb2RlKGRhcmspO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zdG9yYWdlLnNldEl0ZW1Bc3luYyh0aGlzLnN0b3JhZ2VOYW1lLCB0aGlzLnRvZ2dsZUVsZW1lbnQuZGF0YXNldC5kYXJrKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gRXh0ZW5zaW9uRGFya01vZGVNYW5hZ2VyO1xufShCYXNlRGFya01vZGVNYW5hZ2VyKSk7XG5leHBvcnRzLkV4dGVuc2lvbkRhcmtNb2RlTWFuYWdlciA9IEV4dGVuc2lvbkRhcmtNb2RlTWFuYWdlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1haW4uanMubWFwIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHNldHVwRGFya01vZGVGb3JFeHQgfSBmcm9tIFwic2ltcGxlLWRhcmstbW9kZS10b2dnbGVcIjtcblxuZnVuY3Rpb24gZGV0ZWN0R2FtZSgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnB6LWdhbWUtdGl0bGUnKS5pbm5lclRleHQ7XG59XG5cbmNvbnN0IHRvZ2dsZUlEID0gJ2JldHRlcm55dGMtZGFyay1tb2RlLXRvZ2dsZSc7XG5cbmFzeW5jIGZ1bmN0aW9uIHNldHVwVG9nZ2xlKGdhbWVUaXRsZSkge1xuICAgIC8vIEluIGNhc2UgdGhlIGV4dGVuc2lvbiB3YXMgcmVsb2FkZWQsIGZpcnN0IHJlbW92ZSBhbnkgZXhpc3RpbmcgdG9nZ2xlIGJ1dHRvbnNcbiAgICBjb25zdCBleGlzdGluZ1RvZ2dsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjJyArIHRvZ2dsZUlEKTtcbiAgICBmb3IgKGNvbnN0IHQgb2YgZXhpc3RpbmdUb2dnbGVzKSB7XG4gICAgICAgIHQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgLy8gRm9ybSBhbmQgYWRkIHRoZSB0b2dnbGUgYnV0dG9uXG4gICAgY29uc3QgZGFya01vZGVFbHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkYXJrTW9kZUVsdC5zZXRBdHRyaWJ1dGUoJ2lkJywgdG9nZ2xlSUQpXG5cbiAgICBjb25zdCBnYW1lQ2xhc3NOYW1lID0gZ2FtZVRpdGxlLnJlcGxhY2VBbGwoJyAnLCAnXycpO1xuICAgIGRhcmtNb2RlRWx0LmNsYXNzTGlzdC5hZGQoZ2FtZUNsYXNzTmFtZSk7XG5cbiAgICBjb25zdCBnYW1lV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wei1nYW1lLXdyYXBwZXInKTtcbiAgICBjb25zdCBwYXJlbnQgPSBnYW1lV3JhcHBlci5wYXJlbnROb2RlO1xuICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoZGFya01vZGVFbHQsIGdhbWVXcmFwcGVyKTtcblxuICAgIGF3YWl0IHNldHVwRGFya01vZGVGb3JFeHQoZGFya01vZGVFbHQsIHtcbiAgICAgICAgc3RvcmFnZTogJ2xvY2FsJyxcbiAgICAgICAgc3RvcmFnZU5hbWU6IGdhbWVUaXRsZSArICcgRE0nLFxuICAgICAgICBkYXJrQnlEZWZhdWx0OiBmYWxzZSxcbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc3RhcnR1cCgpIHtcbiAgICBjb25zdCBnYW1lVGl0bGUgPSBkZXRlY3RHYW1lKCk7XG4gICAgYXdhaXQgc2V0dXBUb2dnbGUoZ2FtZVRpdGxlKTtcbn1cblxuc3RhcnR1cCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9