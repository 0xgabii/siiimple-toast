import SiiimpleToast from '../src/main';
import '../src/style.scss';

import './style.scss';

const toast = new SiiimpleToast();

setInterval(() => {
  toast.message('siiimple-toast');
}, 1000);
