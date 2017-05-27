const returnVerticalCSS = {
  top: {
    top: '-100px',
  },
  bottom: {
    bottom: '-100px',
  },
};

const returnHorizontalCSS = {
  left: {
    left: '1rem',
  },
  center: {
    left: '50%',
    transform: 'translateX(-50%) scale(0.5)',
  },
  right: {
    right: '1rem',
  },
};

const returnMessageColor = {
  default: '#323232',
  success: '#d93737',
  alert: '#8BC34A',
};

export default class siiimpleToast {
  constructor(settings) {
    // default value
    if (!settings) {
      settings = {
        vertical: 'top',
        horizontal: 'center',
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
    }
    // set vertical direction
    this.verticalStyle = returnVerticalCSS[this._settings.vertical];
    // set horizontal direction
    this.horizontalStyle = returnHorizontalCSS[this._settings.horizontal];
  }
  render(state, message) {
    const root = document.querySelector('body');
    const newToast = document.createElement('div');

    // set Common class
    newToast.className = this.defaultClass;
    // set message
    newToast.innerHTML = message;
    // set style
    Object.assign(newToast.style, this.defaultStyle, this.verticalStyle, this.horizontalStyle);
    // set Message mode (Color)
    newToast.style.backgroundColor = returnMessageColor[state];
    // insert Toast DOM
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
    // All toast objects
    const toasts = document.getElementsByClassName(this.defaultClass);

    // *CSS* transform - scale, opacity 
    if (this._settings.horizontal == 'center') {
      obj.style.transform = 'translateX(-50%) scale(1)';
    } else {
      obj.style.transform = 'scale(1)';
    }
    obj.style.opacity = 1;

    // push effect (Down or Top)
    let pushStack = 15;    
    for(let i = 0; i < toasts.length; i += 1) {
      const toast = toasts[i];
      const height = toast.offsetHeight;
      const objMargin = 15;

      // *CSS* bottom, top 
      if (this._settings.vertical == 'bottom') {
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
    this.render('default', message);
  }
  success(message) {
    this.render('success', message);
  }
  alert(message) {
    this.render('alert', message);
  }
}