let vertical = 'top',
  horizontal = 'center';

let toast = new siiimpleToast();
const btn_default = document.getElementById('default'),
  btn_success = document.getElementById('success'),
  btn_alert = document.getElementById('alert');
const select_vertical = document.getElementById('vertical'),
  select_horizontal = document.getElementById('horizontal');

select_vertical.addEventListener('change', function () {
  vertical = this.value;

  toast = new siiimpleToast({
    vertical: vertical,
    horizontal: horizontal
  });

  codeChange();
});
select_horizontal.addEventListener('change', function () {
  horizontal = this.value;

  toast = new siiimpleToast({
    vertical: vertical,
    horizontal: horizontal
  });

  codeChange();
});

btn_default.addEventListener('click', function () {
  const message = document.getElementById('message');
  message.value ? toast.message(message.value) : toast.message('Hello World');
});
btn_success.addEventListener('click', function () {
  const message = document.getElementById('message');
  message.value ? toast.success(message.value) : toast.success('Hello World');
});
btn_alert.addEventListener('click', function () {
  const message = document.getElementById('message');
  message.value ? toast.alert(message.value) : toast.alert('Hello World');
});

const codeChange = () => {
  const code = document.querySelector('pre > code');

  code.innerHTML =
    `const toast = new siiimpleToast({<br>  vertical: ${vertical},<br>  horizontal: ${horizontal}<br>});                        
            <br>// default - black<br>toast.message('something');<br>// success - green<br>toast.success('something');<br>// alert - red<br>toast.alert('something');`;
}