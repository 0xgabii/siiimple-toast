'use strict';

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
    if (!settings.vertical) throw new Error('Please set parameter "vertical" ex) bottom, top ');
    if (!settings.horizontal) throw new Error('Please set parameter "horizontal" ex) left, center, right ');
    this._settings = settings;
    this.defaultClass = 'siiimpleToast';
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
    // verticalStyle
    if (this._settings.vertical == 'bottom') this.verticalStyle = { bottom: '-100px' };else if (this._settings.vertical == 'top') this.verticalStyle = { top: '-100px' };
    // horizontalStyle
    if (this._settings.horizontal == 'left') this.horizontalStyle = { left: '1rem' };else if (this._settings.horizontal == 'center') this.horizontalStyle = {
      left: '50%',
      transform: 'translateX(-50%) scale(0.5)'
    };else if (this._settings.horizontal == 'right') this.horizontalStyle = { right: '1rem' };
  }

  _createClass(siiimpleToast, [{
    key: 'init',
    value: function init(state, message) {
      var _this = this;

      var root = document.querySelector('body'),
          newToast = document.createElement('div');

      // set Common class
      newToast.className = this.defaultClass;
      // set message
      newToast.innerHTML = message;
      // set defaultStyle
      _extends(newToast.style, this.defaultStyle);
      // set message Mode
      if (state == 'default') newToast.style.backgroundColor = '#323232';else if (state == 'alert') newToast.style.backgroundColor = '#d93737';else if (state == 'success') newToast.style.backgroundColor = '#8BC34A';
      // set vertical direction
      _extends(newToast.style, this.verticalStyle);
      // set horizontal direction
      _extends(newToast.style, this.horizontalStyle);

      // insert Toast DOM
      root.insertBefore(newToast, root.firstChild);

      var time = 0;

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
    value: function addAction(newToast) {
      var stackMargin = 15;
      var toast = document.getElementsByClassName(this.defaultClass);

      newToast.style.opacity = 1;
      if (this._settings.horizontal == 'center') newToast.style.transform = 'translateX(-50%) scale(1)';else newToast.style.transform = 'scale(1)';

      for (var i = 0; i < toast.length; i++) {
        var height = toast[i].offsetHeight;
        var topMargin = 15;

        if (this._settings.vertical == 'bottom') toast[i].style.bottom = stackMargin + 'px';else if (this._settings.vertical == 'top') toast[i].style.top = stackMargin + 'px';

        stackMargin += height + topMargin;
      }
    }
  }, {
    key: 'removeAction',
    value: function removeAction(newToast) {
      var coordinate_left = newToast.getBoundingClientRect().left,
          width = newToast.offsetWidth;

      if (this._settings.horizontal == 'right') newToast.style.right = '-' + width + 'px';else newToast.style.left = coordinate_left + width + 'px';

      newToast.style.opacity = 0;
    }
  }, {
    key: 'removeDOM',
    value: function removeDOM(newToast) {
      var parent = newToast.parentNode;
      parent.removeChild(newToast);
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

var vertical = 'top',
    horizontal = 'center';

var toast = new siiimpleToast();
var btn_default = document.getElementById('default'),
    btn_success = document.getElementById('success'),
    btn_alert = document.getElementById('alert');
var select_vertical = document.getElementById('vertical'),
    select_horizontal = document.getElementById('horizontal');

select_vertical.addEventListener('change', function () {
  vertical = this.value;

  toast = new siiimpleToast({
    vertical: vertical,
    horizontal: horizontal
  });

  codeChange();
});
select_horizontal.addEventListener('change', function () {
  horizontal = this.value;

  toast = new siiimpleToast({
    vertical: vertical,
    horizontal: horizontal
  });

  codeChange();
});

btn_default.addEventListener('click', function () {
  var message = document.getElementById('message');
  message.value ? toast.message(message.value) : toast.message('Hello World');
});
btn_success.addEventListener('click', function () {
  var message = document.getElementById('message');
  message.value ? toast.success(message.value) : toast.success('Hello World');
});
btn_alert.addEventListener('click', function () {
  var message = document.getElementById('message');
  message.value ? toast.alert(message.value) : toast.alert('Hello World');
});

var codeChange = function codeChange() {
  var code = document.querySelector('pre > code');

  code.innerHTML = 'const toast = new siiimpleToast({<br>  vertical: ' + vertical + ',<br>  horizontal: ' + horizontal + '<br>});                        \n            <br>// default - black<br>toast.message(\'something\');<br>// success - green<br>toast.success(\'something\');<br>// alert - red<br>toast.alert(\'something\');';
};