# siiimple-Toast

![demo](http://i.imgur.com/TNzvHD4.png)

**vanilla JS(ES6)**

easily replace console.log and alert in toast message
inspired by material design

## Getting Started
```
npm install --save siiimple-toast
```

## Demo

Static hosted [demo site](https://gomonk3037.github.io/siiimple-Toast/) on GitHub.

## Available

IE Edge, Chrome, Opera

**If you use [Babel](https://babeljs.io/), you can support up to ie9.**

## Usage

### Parameter

change message direction <br>

vertical: top, bottom <br>
horizontal: left, center, right <br>

### Example

```javascript
import siiimpleToast from 'siiimple-toast';

const toast = new siiimpleToast();
// same 
const toast = new siiimpleToast({
  vertical: 'top',
  horizontal: 'center'
});

// default message
toast.message('Hello there'); 

// success message
toast.message('Successfully processed');

// alert message
toast.alert('Something seems to be wrong');

```

## License

This project is licensed under the MIT License