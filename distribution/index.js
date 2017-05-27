'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var returnVerticalCSS = {
  top: {
    top: '-100px'
  },
  bottom: {
    bottom: '-100px'
  }
};

var returnHorizontalCSS = {
  left: {
    left: '1rem'
  },
  center: {
    left: '50%',
    transform: 'translateX(-50%) scale(0.5)'
  },
  right: {
    right: '1rem'
  }
};

var returnMessageColor = {
  default: '#323232',
  success: '#d93737',
  alert: '#8BC34A'
};

var siiimpleToast = function () {
  function siiimpleToast(settings) {
    _classCallCheck(this, siiimpleToast);

    // default value
    if (!settings) {
      settings = {
        vertical: 'top',
        horizontal: 'center'
      };
    }
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
    this.verticalStyle = returnVerticalCSS[this._settings.vertical];
    // set horizontal direction
    this.horizontalStyle = returnHorizontalCSS[this._settings.horizontal];
  }

  _createClass(siiimpleToast, [{
    key: 'render',
    value: function render(state, message) {
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
      newToast.style.backgroundColor = returnMessageColor[state];
      // insert Toast DOM
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
      // All toast objects
      var toasts = document.getElementsByClassName(this.defaultClass);

      // *CSS* transform - scale, opacity 
      if (this._settings.horizontal == 'center') {
        obj.style.transform = 'translateX(-50%) scale(1)';
      } else {
        obj.style.transform = 'scale(1)';
      }
      obj.style.opacity = 1;

      // push effect (Down or Top)
      var pushStack = 15;
      for (var i = 0; i < toasts.length; i += 1) {
        var _toast = toasts[i];
        var height = _toast.offsetHeight;
        var objMargin = 15;

        // *CSS* bottom, top 
        if (this._settings.vertical == 'bottom') {
          _toast.style.bottom = pushStack + 'px';
        } else {
          _toast.style.top = pushStack + 'px';
        }

        pushStack += height + objMargin;
      }
    }
  }, {
    key: 'hide',
    value: function hide(obj) {
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