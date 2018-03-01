# siiimple-toast

> Toast message inspired by material design

[![npm version](https://img.shields.io/npm/v/siiimple-toast.svg?style=flat-square)](https://badge.fury.io/js/siiimple-toast)
[![available](https://img.shields.io/badge/available-IE9%2B%2C%20Chrome%2C%20Opera%20-brightgreen.svg?style=flat-square)]()
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)]()

![demo](./example.gif)

**siiimple-toast** is a **Pure** Javascript library for non-blocking notifications.

## Demo

[https://gomonk3037.github.io/siiimple-toast/](https://gomonk3037.github.io/siiimple-toast/)

## Installation
```
$ yarn add siiimple-toast
```

## Getting started

```javascript
import toast from 'siiimple-toast';
import 'siiimple-toast/style.css';// style required

toast.message('Hello world');
```

### Onther examples

```javascript
// success message
toast.success('Successfully processed');

// alert message
toast.alert('Something seems to be wrong');

// support HTML
toast.message('<button>Support HTML</button>'); 

// message with options
toast.message('Set options', { delay: 1000 });

```

## Options

Use `.setOptions()` to set options

```javascript
toast = toast.setOptions({
  class: 'siiimpleToast',
  position: 'top|center',
  margin: 15,
  delay: 0,
  duration: 3000,
});
```

- `class` (`string`): css class for toast element (defaults to `siiimpleToast`)
- `position` (`string`): positioning toast element (defaults to `top|center`)
  - available: `top|left`, `top|center`, `top|right`, `bottom|left`, `bottom|center`, `bottom|right`
- `margin` (`number`): margin between multiple toast (defaults to `15px`)
- `delay` (`number`): delay before showing toast element (defaults to `0ms`)
- `duration` (`number`): duration to show toast element (defaults to `3000ms`)


## Available

IE9+, Chrome, Opera

## License

This project is licensed under the MIT License