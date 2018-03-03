import toast from '../src/main';
import '../src/style.scss';

import './style.scss';

toast
  .message('siiimple-toast')
  .success('siiimple-toast', { delay: 1000, position: 'top|right' })
  .alert('siiimple-toast', { delay: 2000 });
