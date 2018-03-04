import toast from '../../src/main';

const pre = document.querySelector('#demo');

let state = 'message';

const options = {
  message: 'Hello world',
  position: 'top|center',
  margin: 15,
  delay: 0,
  duration: 3000,
};

const changePreText = () => {
  pre.textContent =
    "import toast from 'siiimple-toast';\n" +
    "import 'siiimple-toast/dist/style.css';// style required\n" +
    '\n' +
    `toast.${state}("${options.message}", {\n` +
    `  position: "${options.position}",\n` +
    `  margin: ${options.margin},\n` +
    `  delay: ${options.delay},\n` +
    `  duration: ${options.duration},\n` +
    '});';
};

Object.keys(options).forEach((key) => {
  document.querySelector(`[data-input="${key}"]`).addEventListener('keyup', (e) => {
    if (key === 'margin' || key === 'delay' || key === 'duration') {
      options[key] = Number(e.target.value);
    } else {
      options[key] = e.target.value;
    }
    changePreText();
  });
});

const buttons = ['message', 'success', 'alert'];

buttons.forEach((button) => {
  document.querySelector(`[data-btn="${button}"]`).addEventListener('click', () => {
    state = button;
    changePreText();
    toast[state](options.message, options);
  });
});


changePreText();

/* ***************************** */
