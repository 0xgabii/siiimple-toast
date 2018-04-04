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

const privateKeys = {
  defaultOptions: Symbol('defaultOptions'),
  render: Symbol('render'),
  show: Symbol('show'),
  hide: Symbol('hide'),
  removeDOM: Symbol('removeDOM'),
};

const siiimpleToast = {
  [privateKeys.defaultOptions]: {
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
      [privateKeys.defaultOptions]: {
        ...this[privateKeys.defaultOptions],
        ...options,
      },
    };
  },

  [privateKeys.render](state, message, options = {}) {
    const mergedOptions = {
      ...this[privateKeys.defaultOptions],
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
      this[privateKeys.show](newToast, mergedOptions);
    }, time += delay);
    setTimeout(() => {
      this[privateKeys.hide](newToast, mergedOptions);
    }, time += duration);

    // support method chaining
    return this;
  },

  [privateKeys.show](el, { container, class: className, margin }) {
    const hasPos = (v, pos) => getAttr(v, 'data-position').indexOf(pos) > -1;

    const root = document.querySelector(container);
    root.insertBefore(el, root.firstChild);

    // set initial position
    setStyles(el, {
      position: container === 'body' ? 'fixed' : 'absolute',
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

  [privateKeys.hide](el) {
    const hasPos = (v, pos) => getAttr(v, 'data-position').indexOf(pos) > -1;
    const { left, width } = el.getBoundingClientRect();

    setStyles(el, {
      [hasPos(el, 'left') && 'left']: `${width}px`,
      [hasPos(el, 'center') && 'left']: `${left + width}px`,
      [hasPos(el, 'right') && 'right']: `-${width}px`,
      opacity: 0,
    });

    const whenTransitionEnd = () => {
      this[privateKeys.removeDOM](el);
      el.removeEventListener('transitionend', whenTransitionEnd);
    };

    el.addEventListener('transitionend', whenTransitionEnd);
  },

  [privateKeys.removeDOM](el) {// eslint-disable-line
    const parent = el.parentElement;
    parent.removeChild(el);
  },

  message(message, options) {
    return this[privateKeys.render]('default', message, options);
  },
  success(message, options) {
    return this[privateKeys.render]('success', message, options);
  },
  alert(message, options) {
    return this[privateKeys.render]('alert', message, options);
  },
};

export default siiimpleToast;
