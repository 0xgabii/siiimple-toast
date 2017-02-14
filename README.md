# siiimple-Toast

[![npm version](https://img.shields.io/npm/v/siiimple-toast.svg)](https://badge.fury.io/js/siiimple-toast) [![available](https://img.shields.io/badge/available-IE9%2B%2C%20Chrome%2C%20Opera%20-brightgreen.svg)]() [![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

![demo](http://i.imgur.com/TNzvHD4.png)

**vanilla JS**
easily replace console.log and alert in toast message
inspired by material design

## Getting Started
```
npm install --save siiimple-toast
```

## Demo

Static hosted [demo site](https://rawgit.com/gomonk3037/siiimple-Toast/master/public/index.html) on GitHub.

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
## Available

IE9+, Chrome, Opera

## License

This project is licensed under the MIT License