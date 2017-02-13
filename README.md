# siiimple-Toast

**vanilla JS(ES6)**

easily replace console.log and alert in toast message
inspired by material design

## Demo
[https://gomonk3037.github.io/siiimple-Toast/](https://gomonk3037.github.io/siiimple-Toast/)

## Available
IE Edge, Chrome, Opera

## Usage

**Parameters**
- vertical: vertical direction ex) top, bottom
- horizontal: horizontal direction ex) left, center, right

```javascript

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