/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
class siiimpleToast {
  constructor(settings) {
    // default Settings
    if (!settings) {
      settings = {
        vertical: 'top',
        horizontal: 'center'
      };
    }
    // default Class (DOM)
    this.defaultClass = 'siiimpleToast';
    // settings binding
    this.settings = settings;
  }
  render(state, message) {
    const root = document.querySelector('body');
    const newToast = document.createElement('div');

    // set className
    newToast.className = this.defaultClass;
    // set message
    newToast.innerHTML = message;
    // set toast vertical, horizontal direction (css class)
    newToast.classList.add(...Object.keys(this.settings).map(key => this.settings[key]));
    // set nessage mode (css class)
    newToast.classList.add(state);

    // insert toast DOM
    root.insertBefore(newToast, root.firstChild);

    let time = 0;
    // setTimeout - instead Of jQuery.queue();
    setTimeout(() => {
      this.show(newToast);
    }, time += 100);
    setTimeout(() => {
      this.hide(newToast);
    }, time += 3000);
    setTimeout(() => {
      this.removeDOM(newToast);
    }, time += 500);
  }
  show(obj) {
    // all toast object
    const toasts = document.getElementsByClassName(this.defaultClass);

    // CSS | transform - scale, opacity
    if (this.settings.horizontal === 'center') {
      obj.style.transform = 'translateX(-50%) scale(1)';
    } else {
      obj.style.transform = 'scale(1)';
    }
    obj.style.opacity = 1;

    // push effect (Down or Top)
    let pushStack = 15;

    for (let i = 0; i < toasts.length; i += 1) {
      const toast = toasts[i];
      const height = toast.offsetHeight;
      const objMargin = 15;

      // CSS | bottom, top
      if (this.settings.vertical === 'bottom') {
        toast.style.bottom = `${pushStack}px`;
      } else {
        toast.style.top = `${pushStack}px`;
      }

      pushStack += height + objMargin;
    }
  }
  hide(obj) {
    const width = obj.offsetWidth;
    const objCoordinate = obj.getBoundingClientRect();

    // CSS | right, left
    if (this.settings.horizontal === 'right') {
      obj.style.right = `-${width}px`;
    } else {
      obj.style.left = `${objCoordinate.left + width}px`;
    }
    obj.style.opacity = 0;
  }
  removeDOM(obj) {
    // eslint-disable-line
    const parent = obj.parentNode;
    parent.removeChild(obj);
  }
  message(message) {
    this.render('default', message);
  }
  success(message) {
    this.render('success', message);
  }
  alert(message) {
    this.render('alert', message);
  }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = siiimpleToast;


/***/ })
/******/ ]);