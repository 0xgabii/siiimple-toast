'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var siiimpleToast = function () {
  function siiimpleToast(settings) {
    _classCallCheck(this, siiimpleToast);

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

  _createClass(siiimpleToast, [{
    key: 'render',
    value: function render(state, message) {
      var _newToast$classList,
          _this = this;

      var root = document.querySelector('body');
      var newToast = document.createElement('div');

      // set className
      newToast.className = this.defaultClass;
      // set message
      newToast.innerHTML = message;
      // set toast vertical, horizontal direction (css class)
      (_newToast$classList = newToast.classList).add.apply(_newToast$classList, _toConsumableArray(Object.keys(this.settings).map(function (key) {
        return _this.settings[key];
      })));
      // set nessage mode (css class)
      newToast.classList.add(state);

      // insert toast DOM
      root.insertBefore(newToast, root.firstChild);

      var time = 0;
      // setTimeout - instead Of jQuery.queue();
      setTimeout(function () {
        _this.show(newToast);
      }, time += 100);
      setTimeout(function () {
        _this.hide(newToast);
      }, time += 3000);
      setTimeout(function () {
        _this.removeDOM(newToast);
      }, time += 500);
    }
  }, {
    key: 'show',
    value: function show(obj) {
      // all toast object
      var toasts = document.getElementsByClassName(this.defaultClass);

      // CSS | transform - scale, opacity
      if (this.settings.horizontal === 'center') {
        obj.style.transform = 'translateX(-50%) scale(1)';
      } else {
        obj.style.transform = 'scale(1)';
      }
      obj.style.opacity = 1;

      // push effect (Down or Top)
      var pushStack = 15;

      for (var i = 0; i < toasts.length; i += 1) {
        var toast = toasts[i];
        var height = toast.offsetHeight;
        var objMargin = 15;

        // CSS | bottom, top
        if (this.settings.vertical === 'bottom') {
          toast.style.bottom = pushStack + 'px';
        } else {
          toast.style.top = pushStack + 'px';
        }

        pushStack += height + objMargin;
      }
    }
  }, {
    key: 'hide',
    value: function hide(obj) {
      var width = obj.offsetWidth;
      var objCoordinate = obj.getBoundingClientRect();

      // CSS | right, left
      if (this.settings.horizontal === 'right') {
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
      this.render('default', _message);
    }
  }, {
    key: 'success',
    value: function success(message) {
      this.render('success', message);
    }
  }, {
    key: 'alert',
    value: function alert(message) {
      this.render('alert', message);
    }
  }]);

  return siiimpleToast;
}();

exports.default = siiimpleToast;