class siiimpleToast {
  constructor(settings) {
    // default settings
    if (!settings) {
      settings = {
        vertical: 'top',
        horizontal: 'center'
      }
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
    }
    // set vertical direction
    this.verticalStyle = this.setVerticalStyle()[this._settings.vertical];
    // set horizontal direction
    this.horizontalStyle = this.setHorizontalStyle()[this._settings.horizontal];
  }
  setVerticalStyle() {
    return {
      top: {
        top: '-100px'
      },
      bottom: {
        bottom: '-100px'
      }
    }
  }
  setHorizontalStyle() {
    return {
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
    }
  }
  setMessageStyle() {
    return {
      default: '#323232',
      success: '#d93737',
      alert: '#8BC34A',
    }
  }
  init(state, message) {
    const root = document.querySelector('body');
    const newToast = document.createElement('div');

    // set Common class
    newToast.className = this.defaultClass;
    // set message
    newToast.innerHTML = message;
    // set style
    Object.assign(
      newToast.style,
      this.defaultStyle,
      this.verticalStyle,
      this.horizontalStyle
    );
    // set Message mode (Color)
    newToast.style.backgroundColor = this.setMessageStyle()[state];
    // insert Toast DOM
    root.insertBefore(newToast, root.firstChild);

    // Actions...
    let time = 0;
    // setTimeout - instead Of jQuery.queue();
    setTimeout(() => {
      this.addAction(newToast);
    }, time += 100);
    setTimeout(() => {
      this.removeAction(newToast);
    }, time += 3000);
    setTimeout(() => {
      this.removeDOM(newToast);
    }, time += 500);
  }
  addAction(obj) {
    // All toast objects
    const toast = document.getElementsByClassName(this.defaultClass);
    let pushStack = 15;

    // *CSS* transform - scale, opacity 
    if (this._settings.horizontal == 'center') {
      obj.style.transform = 'translateX(-50%) scale(1)';
    } else {
      obj.style.transform = 'scale(1)';
    }
    obj.style.opacity = 1;

    // push effect (Down or Top)
    for (let i = 0; i < toast.length; i += 1) {
      const height = toast[i].offsetHeight;
      const objMargin = 15; // interval between objects

      // *CSS* bottom, top 
      if (this._settings.vertical == 'bottom') {
        toast[i].style.bottom = `${pushStack}px`;
      } else {
        toast[i].style.top = `${pushStack}px`;
      }

      pushStack += height + objMargin;
    }
  }
  removeAction(obj) {
    const width = obj.offsetWidth;
    const objCoordinate = obj.getBoundingClientRect();

    // remove effect
    // *CSS*  direction: right, opacity: 0
    if (this._settings.horizontal == 'right') {
      obj.style.right = `-${width}px`;
    } else {
      obj.style.left = `${objCoordinate.left + width}px`;
    }
    obj.style.opacity = 0;
  }
  removeDOM(obj) {
    const parent = obj.parentNode;
    parent.removeChild(obj);
  }
  message(message) {
    this.init('default', message);
  }
  success(message) {
    this.init('success', message);
  }
  alert(message) {
    this.init('alert', message);
  }
}

let vertical = 'top',
  horizontal = 'center';

let toast = new siiimpleToast();
const btn_default = document.getElementById('default'),
  btn_success = document.getElementById('success'),
  btn_alert = document.getElementById('alert');
const select_vertical = document.getElementById('vertical'),
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
  const message = document.getElementById('message');
  message.value ? toast.message(message.value) : toast.message('Hello World');
});
btn_success.addEventListener('click', function () {
  const message = document.getElementById('message');
  message.value ? toast.success(message.value) : toast.success('Hello World');
});
btn_alert.addEventListener('click', function () {
  const message = document.getElementById('message');
  message.value ? toast.alert(message.value) : toast.alert('Hello World');
});

var codeChange = function codeChange() {
  const code = document.querySelector('pre > code');

  code.innerHTML = 'const toast = new siiimpleToast({<br>  vertical: ' + vertical + ',<br>  horizontal: ' + horizontal + '<br>});                        \n            <br>// default - black<br>toast.message(\'something\');<br>// success - green<br>toast.success(\'something\');<br>// alert - red<br>toast.alert(\'something\');';
};