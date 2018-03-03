const siiimpleToast = {
  defaultOptions: {
    // el: 'body',
    class: 'siiimpleToast',
    position: 'top|center',
    margin: 15,
    delay: 0,
    duration: 3000,
  },

  setOptions(options = {}) {
    return {
      ...siiimpleToast,
      defaultOptions: {
        ...this.defaultOptions,
        ...options,
      },
    };
  },

  render(state, message, options = {}) {
    const mergedOptions = {
      ...this.defaultOptions,
      ...options,
    };

    const {
      class: className,
      position,
      delay,
      duration,
    } = mergedOptions;

    const newToast = document.createElement('div');

    // set className
    newToast.className = className;
    // set message
    newToast.innerHTML = message;
    // set position (css class)
    newToast.classList.add(...position.split('|'));
    // set nessage mode (css class)
    newToast.classList.add(state);

    let time = 0;
    // setTimeout - instead of jQuery.queue();
    setTimeout(() => {
      this.show(newToast, mergedOptions);
    }, time += delay);
    setTimeout(() => {
      this.hide(newToast, mergedOptions);
    }, time += duration);
  },

  show(el, { class: className, margin, position }) {
    const toasts = document.getElementsByClassName(className);
    const root = document.querySelector('body');
    root.insertBefore(el, root.firstChild);

    // CSS | transform - scale, opacity
    el.style.transform = position.includes('center')
      ? 'translateX(-50%) scale(1)'
      : 'scale(1)';
    el.style.opacity = 1;

    // push effect
    let pushStack = margin;

    Array.from(toasts).forEach((toast) => {
      const height = toast.offsetHeight;

      // CSS | bottom, top
      if (toast.classList.contains('bottom')) {
        toast.style.bottom = `${pushStack}px`;
      } else {
        toast.style.top = `${pushStack}px`;
      }

      pushStack += height + margin;
    });
  },

  hide(el) {
    const { left, width } = el.getBoundingClientRect();

    // CSS | right, left
    if (this.options.position.includes('right')) {
      el.style.right = `-${width}px`;
    } else {
      el.style.left = `${left + width}px`;
    }
    el.style.opacity = 0;

    const whenTransitionEnd = () => {
      this.removeDOM(el);
      el.removeEventListener('transitionend', whenTransitionEnd);
    };

    el.addEventListener('transitionend', whenTransitionEnd);
  },

  removeDOM(el) {// eslint-disable-line
    const parent = el.parentNode;
    parent.removeChild(el);
  },

  message(message, options) {
    return this.render('default', message, options);
  },
  success(message, options) {
    return this.render('success', message, options);
  },
  alert(message, options) {
    return this.render('alert', message, options);
  },
};

export default siiimpleToast;
