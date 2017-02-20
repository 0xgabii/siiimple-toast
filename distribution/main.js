'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var siiimpleToast = function () {
  function siiimpleToast(settings) {
    _classCallCheck(this, siiimpleToast);

    // default settings
    if (!settings) {
      settings = {
        vertical: 'top',
        horizontal: 'center'
      };
    }
    // throw Parameter Error    
    if (!settings.vertical) throw new Error('Please set parameter "vertical" ex) bottom, top ');
    if (!settings.horizontal) throw new Error('Please set parameter "horizontal" ex) left, center, right ');
    // data binding
    this._settings = settings;
    // default Class (DOM)
    this.defaultClass = 'siiimpleToast';
    // default Style
    this.defaultStyle = {
      position: 'fixed',
      padding: '1rem 1.2rem',
      minWidth: '17rem',
      zIndex: '10',
      borderRadius: '2px',
      color: 'white',
      fontWeight: 300,
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      opacity: 0,
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
      transform: 'scale(0.5)',
      transition: 'all 0.4s ease-out'
    };
    // set vertical direction
    this.verticalStyle = this.setVerticalStyle()[this._settings.vertical]();
    // set horizontal direction
    this.horizontalStyle = this.setHorizontalStyle()[this._settings.horizontal]();
  }

  _createClass(siiimpleToast, [{
    key: 'setVerticalStyle',
    value: function setVerticalStyle() {
      return {
        top: function top() {
          return {
            top: '-100px'
          };
        },
        bottom: function bottom() {
          return {
            bottom: '-100px'
          };
        }
      };
    }
  }, {
    key: 'setHorizontalStyle',
    value: function setHorizontalStyle() {
      return {
        left: function left() {
          return {
            left: '1rem'
          };
        },
        center: function center() {
          return {
            left: '50%',
            transform: 'translateX(-50%) scale(0.5)'
          };
        },
        right: function right() {
          return {
            right: '1rem'
          };
        }
      };
    }
  }, {
    key: 'setMessageStyle',
    value: function setMessageStyle() {
      return {
        default: function _default() {
          return '#323232';
        },
        success: function success() {
          return '#d93737';
        },
        alert: function alert() {
          return '#8BC34A';
        }
      };
    }
  }, {
    key: 'init',
    value: function init(state, message) {
      var _this = this;

      var root = document.querySelector('body');
      var newToast = document.createElement('div');

      // set Common class
      newToast.className = this.defaultClass;
      // set message
      newToast.innerHTML = message;
      // set style
      _extends(newToast.style, this.defaultStyle, this.verticalStyle, this.horizontalStyle);
      // set Message mode (Color)
      newToast.style.backgroundColor = this.setMessageStyle()[state]();
      // insert Toast DOM
      root.insertBefore(newToast, root.firstChild);

      // Actions...
      var time = 0;
      // setTimeout - instead Of jQuery.queue();
      setTimeout(function () {
        _this.addAction(newToast);
      }, time += 100);
      setTimeout(function () {
        _this.removeAction(newToast);
      }, time += 3000);
      setTimeout(function () {
        _this.removeDOM(newToast);
      }, time += 500);
    }
  }, {
    key: 'addAction',
    value: function addAction(obj) {
      // All toast objects
      var toast = document.getElementsByClassName(this.defaultClass);
      var pushStack = 15;

      // *CSS* transform - scale, opacity 
      if (this._settings.horizontal == 'center') {
        obj.style.transform = 'translateX(-50%) scale(1)';
      } else {
        obj.style.transform = 'scale(1)';
      }
      obj.style.opacity = 1;

      // push effect (Down or Top)
      for (var i = 0; i < toast.length; i += 1) {
        var height = toast[i].offsetHeight;
        var objMargin = 15; // interval between objects

        // *CSS* bottom, top 
        if (this._settings.vertical == 'bottom') {
          toast[i].style.bottom = pushStack + 'px';
        } else {
          toast[i].style.top = pushStack + 'px';
        }

        pushStack += height + objMargin;
      }
    }
  }, {
    key: 'removeAction',
    value: function removeAction(obj) {
      var width = obj.offsetWidth;
      var objCoordinate = obj.getBoundingClientRect();

      // remove effect
      // *CSS*  direction: right, opacity: 0
      if (this._settings.horizontal == 'right') {
        obj.style.right = '-' + width + 'px';
      } else {
        obj.style.left = objCoordinate.left + width + 'px';
      }
      obj.style.opacity = 0;
    }
  }, {
    key: 'removeDOM',
    value: function removeDOM(obj) {
      var parent = obj.parentNode;
      parent.removeChild(obj);
    }
  }, {
    key: 'message',
    value: function message(_message) {
      this.init('default', _message);
    }
  }, {
    key: 'success',
    value: function success(message) {
      this.init('success', message);
    }
  }, {
    key: 'alert',
    value: function alert(message) {
      this.init('alert', message);
    }
  }]);

  return siiimpleToast;
}();

exports.default = siiimpleToast;