const setStyles = (el, styles) => {
  Object.keys(styles).forEach((key) => {
    el.style[key] = styles[key];
  });
};

const setAttrs = (el, attrs) => {
  Object.keys(attrs).forEach((key) => {
    el.setAttribute(key, attrs[key]);
  });
};

const getAttr = (el, attr) => el.getAttribute(attr);

const siiimpleToast = {
  defaultOptions: {
    container: 'body',
    class: 'siiimpleToast',
    position: 'top|center',
    margin: 15,
    delay: 0,
    duration: 3000,
    style: {},
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
      style,
    } = mergedOptions;

    const newToast = document.createElement('div');

    // logging via attrs
    newToast.className = className;
    newToast.innerHTML = message;

    setAttrs(newToast, {
      'data-position': position,
      'data-state': state,
    });

    setStyles(newToast, style);

    // use .setTimeout() instead of $.queue()
    let time = 0;
    setTimeout(() => {
      this.show(newToast, mergedOptions);
    }, time += delay);
    setTimeout(() => {
      this.hide(newToast, mergedOptions);
    }, time += duration);

    // support method chaining
    return this;
  },

  show(el, { container, class: className, margin }) {
    const hasPos = (v, pos) => getAttr(v, 'data-position').includes(pos);

    const root = document.querySelector(container);
    root.insertBefore(el, root.firstChild);

    // set initial position
    setStyles(el, {
      [hasPos(el, 'top') ? 'top' : 'bottom']: '-100px',
      [hasPos(el, 'left') && 'left']: '15px',
      [hasPos(el, 'center') && 'left']: `${(root.clientWidth / 2) - (el.clientWidth / 2)}px`,
      [hasPos(el, 'right') && 'right']: '15px',
    });

    setStyles(el, {
      transform: 'scale(1)',
      opacity: 1,
    });

    // push effect
    let pushStack = margin;

    Array
      .from(document.querySelectorAll(`.${className}[data-position="${getAttr(el, 'data-position')}"]`))
      .filter(toast => toast.parentElement === el.parentElement)// matching container
      .forEach((toast) => {
        setStyles(toast, {
          [hasPos(toast, 'top') ? 'top' : 'bottom']: `${pushStack}px`,
        });

        pushStack += toast.offsetHeight + margin;
      });
  },

  hide(el) {
    const hasPos = (v, pos) => getAttr(v, 'data-position').includes(pos);
    const { left, width } = el.getBoundingClientRect();

    setStyles(el, {
      [hasPos(el, 'left') && 'left']: `${width}px`,
      [hasPos(el, 'center') && 'left']: `${left + width}px`,
      [hasPos(el, 'right') && 'right']: `-${width}px`,
      opacity: 0,
    });

    const whenTransitionEnd = () => {
      this.removeDOM(el);
      el.removeEventListener('transitionend', whenTransitionEnd);
    };

    el.addEventListener('transitionend', whenTransitionEnd);
  },

  removeDOM(el) {// eslint-disable-line
    const parent = el.parentElement;
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
