class siiimpleToast {
  constructor(settings) {
    // default Settings
    if (!settings) {
      settings = {
        vertical: 'top',
        horizontal: 'center',
      };
    }
    // default Class (DOM)
    this.defaultClass = 'siiimpleToast';
    // settings binding
    this.settings = settings;
  }
  render(state, message) {
    const root = document.querySelector('body');
    const newToast = document.createElement('div');

    // set className
    newToast.className = this.defaultClass;
    // set message
    newToast.innerHTML = message;
    // set toast vertical, horizontal direction (css class)
    newToast.classList.add(...Object.keys(this.settings).map(key => this.settings[key]));
    // set nessage mode (css class)
    newToast.classList.add(state);

    // insert toast DOM
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
    // all toast object
    const toasts = document.getElementsByClassName(this.defaultClass);

    // CSS | transform - scale, opacity
    if (this.settings.horizontal === 'center') {
      obj.style.transform = 'translateX(-50%) scale(1)';
    } else {
      obj.style.transform = 'scale(1)';
    }
    obj.style.opacity = 1;

    // push effect (Down or Top)
    let pushStack = 15;

    for (let i = 0; i < toasts.length; i += 1) {
      const toast = toasts[i];
      const height = toast.offsetHeight;
      const objMargin = 15;

      // CSS | bottom, top
      if (this.settings.vertical === 'bottom') {
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

    // CSS | right, left
    if (this.settings.horizontal === 'right') {
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

let vertical = 'top';
let horizontal = 'center';
let toast = new siiimpleToast();

const defaultBtn = document.getElementById('default');
const successBtn = document.getElementById('success');
const alertBtn = document.getElementById('alert');
const verticalSelect = document.getElementById('vertical');
const horizontalSelect = document.getElementById('horizontal');

const codeChange = () => {
  const code = document.querySelector('pre > code');

  code.innerHTML = `const toast = new siiimpleToast({<br>  vertical: ' ${vertical} ',<br>  horizontal: ' ${horizontal} '<br>});                        \n            <br>// default - black<br>toast.message(\'something\');<br>// success - green<br>toast.success('something');<br>// alert - red<br>toast.alert('something');`;
};

verticalSelect.addEventListener('change', function() {
  vertical = this.value;

  toast = new siiimpleToast({
    vertical: this.value,
    horizontal,
  });

  codeChange();
});

horizontalSelect.addEventListener('change', function() {
  horizontal = this.value;

  toast = new siiimpleToast({
    vertical,
    horizontal,
  });

  codeChange();
});

defaultBtn.addEventListener('click', () => {
  const message = document.getElementById('message');
  message.value ? toast.message(message.value) : toast.message('Hello World');
});

successBtn.addEventListener('click', () => {
  const message = document.getElementById('message');
  message.value ? toast.success(message.value) : toast.success('Hello World');
});

alertBtn.addEventListener('click', () => {
  const message = document.getElementById('message');
  message.value ? toast.alert(message.value) : toast.alert('Hello World');
});
