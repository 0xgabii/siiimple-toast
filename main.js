class siiimpleToast {
  constructor(settings) {
    if (!settings.rootElement) throw new Error('Please set parameter "rootElement" ');
    this._settings = settings;
    this.defaultStyle = {
      position: 'fixed',
      left: '50%',
      top: '-100px',
      padding: '1rem 1.2rem',
      minWidth: '15rem',
      zIndex: '10',
      borderRadius: '2px',
      color: 'white',
      fontWeight: 300,
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      opacity: 0,
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
      transform: 'translateX(-50%) scale(0.5)',
      transition: 'all 0.4s ease-out'
    }
  }
  logic(state, message) {
    const root = document.querySelector(this._settings.rootElement),
      newToast = document.createElement('div');

    let time = 0;

    // set Common class
    newToast.className = 'siiimpleToast';
    // set message
    newToast.innerHTML = message;
    // set Style
    Object.assign(newToast.style, this.defaultStyle);
    if (state == 'default')
      newToast.style.backgroundColor = '#323232';
    else if (state == 'alert')
      newToast.style.backgroundColor = '#d93737';
    else if (state == 'success')
      newToast.style.backgroundColor = '#8BC34A';

    // insert Toast DOM
    root.insertBefore(newToast, root.firstChild);

    // add Action
    setTimeout(() => {
      let stackMargin = 15;
      const toast = document.querySelectorAll('.siiimpleToast');

      newToast.style.opacity = 1;
      newToast.style.transform = 'translateX(-50%) scale(1)';

      for (let i = 0; i < toast.length; i++) {
        let height = toast[i].offsetHeight;
        let topMargin = 15;
        toast[i].style.top = stackMargin + 'px';
        stackMargin += height + topMargin;
      }
    }, time += 100);

    // remove Action
    setTimeout(() => {
      let winWidth = window.outerWidth;
      let width = newToast.offsetWidth;

      newToast.style.opacity = 0;
      newToast.style.left = (winWidth / 2) + width + 'px';

    }, time += 3000);

    // delete Dom
    setTimeout(() => {
      const parent = newToast.parentNode;
      parent.removeChild(newToast);
    }, time += 500);

  }
  message(message) {
    this.logic('default', message);
  }
  success(message) {
    this.logic('success', message);
  }
  alert(message) {
    this.logic('alert', message);
  }
}