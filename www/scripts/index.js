import anime from 'animejs';// eslint-disable-line

import toast from '../../src/main';
import '../../src/style.scss';

import '../styles/main.scss';

import './demo';

const timeline = anime.timeline({
  easing: 'easeOutExpo',
  autoplay: false,
});

timeline
  .add({
    targets: ['h1', 'p', '.block'],
    translateY: [100, 0],
    opacity: [0, 1],
    delay(el, i) {
      return i * 100;
    },
  });

document.addEventListener('DOMContentLoaded', () => {
  const topleftToast = toast.setOptions({
    position: 'top|left',
  });

  topleftToast
    .message('Siiimple toast')
    .message('Pure javascript library for non-blocking notifications', { delay: 500 })
    .success('Available in IE9+, Chrome, Opera', { delay: 1000 })
    .alert('MIT licence', { delay: 1500 });

  setTimeout(() => {
    timeline.play();
  }, 2000);
});
