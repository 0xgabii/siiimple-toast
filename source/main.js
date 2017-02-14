export default class siiimpleToast {
  constructor(settings) {
    // default settings
    if (!settings) {
      settings = {
        vertical: 'top',
        horizontal: 'center'
      }
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
    }
    // verticalStyle
    if (this._settings.vertical == 'bottom')
      this.verticalStyle = { bottom: '-100px' };
    else if (this._settings.vertical == 'top')
      this.verticalStyle = { top: '-100px' };
    // horizontalStyle
    if (this._settings.horizontal == 'left')
      this.horizontalStyle = { left: '1rem' };
    else if (this._settings.horizontal == 'center')
      this.horizontalStyle = {
        left: '50%',
        transform: 'translateX(-50%) scale(0.5)'
      };
    else if (this._settings.horizontal == 'right')
      this.horizontalStyle = { right: '1rem' };
  }
  init(state, message) {
    const root = document.querySelector('body'),
      newToast = document.createElement('div');

    // set Common class
    newToast.className = this.defaultClass;
    // set message
    newToast.innerHTML = message;
    // set defaultStyle
    Object.assign(newToast.style, this.defaultStyle);
    // set message Mode
    if (state == 'default')
      newToast.style.backgroundColor = '#323232';
    else if (state == 'alert')
      newToast.style.backgroundColor = '#d93737';
    else if (state == 'success')
      newToast.style.backgroundColor = '#8BC34A';
    // set vertical direction
    Object.assign(newToast.style, this.verticalStyle);
    // set horizontal direction
    Object.assign(newToast.style, this.horizontalStyle);

    // insert Toast DOM
    root.insertBefore(newToast, root.firstChild);

    let time = 0;

    // add Action
    setTimeout(() => {
      let stackMargin = 15;
      const toast = document.getElementsByClassName(this.defaultClass);

      newToast.style.opacity = 1;
      if (this._settings.horizontal == 'center')
        newToast.style.transform = 'translateX(-50%) scale(1)';
      else
        newToast.style.transform = 'scale(1)';

      for (let i = 0; i < toast.length; i++) {
        let height = toast[i].offsetHeight;
        let topMargin = 15;

        if (this._settings.vertical == 'bottom')
          toast[i].style.bottom = stackMargin + 'px';
        else if (this._settings.vertical == 'top')
          toast[i].style.top = stackMargin + 'px';

        stackMargin += height + topMargin;
      }
    }, time += 100);

    // remove Action
    setTimeout(() => {
      let coordinate_left = newToast.getBoundingClientRect().left,
        width = newToast.offsetWidth;

      if (this._settings.horizontal == 'right')
        newToast.style.right = '-' + width + 'px';
      else
        newToast.style.left = coordinate_left + width + 'px';

      newToast.style.opacity = 0;
    }, time += 3000);

    // delete Dom
    setTimeout(() => {
      const parent = newToast.parentNode;
      parent.removeChild(newToast);
    }, time += 500);
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