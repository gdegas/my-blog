---
title: Useful Browser specific functions
date: "2019-12-08T20:35:03.284Z"
description: "JS things for the browser"
---

##Browser functions

####smoothScroll

Smoothly scrolls the element on which it's called into the visible area of the browser window.

Use `.scrollIntoView` method to scroll the element. Pass `{ behavior: 'smooth' }` to `.scrollIntoView` so it scrolls smoothly.
```js
const smoothScroll = element =>
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth'
  });

```

####scrollToTop

```javascript
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
```
---
####Returns the *scroll position* of the current page.

Use `pageXOffset` and `pageYOffset` if they are defined, otherwise scrollLeft and scrollTop. You can omit el to use a default value of window.

```javascript
const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});
```
---

####elementIsVisibleInViewport

Returns true if the element specified is visible in the viewport, false otherwise.

Use Element.getBoundingClientRect() and the window.inner(Width|Height) values to determine if a given element is visible in the viewport. Omit the second argument to determine if the element is entirely visible, or specify true to determine if it is partially visible.

```javascript
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

EXAMPLES
// e.g. 100x100 viewport and a 10x10px element at position {top: -1, left: 0, bottom: 9, right: 10}
elementIsVisibleInViewport(el); // false - (not fully visible)
elementIsVisibleInViewport(el, true); // true - (partially visible)
```
---
####detectDeviceType

Detects whether the website is being opened in a mobile device or a desktop/laptop.

Use a regular expression to test the `navigator.userAgent` property to figure out if the device is a mobile device or a desktop/laptop.

```js
const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? 'Mobile'
    : 'Desktop';

EXAMPLES
detectDeviceType(); // "Mobile" or "Desktop"
```

####getStyle

Returns the value of a CSS rule for the specified element.

Use `Window.getComputedStyle()` to get the value of the CSS rule for the specified element

```js
const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];

EXAMPLES
getStyle(document.querySelector('p'), 'font-size'); // '16px'
```


####triggerEvent

Triggers a specific event on a given element, optionally passing custom data.

Use `new CustomEvent()` to create an event from the specified eventType and details. Use `el.dispatchEvent()` to trigger the newly created event on the given element. Omit the third argument, detail, if you do not want to pass custom data to the triggered event.

```js
const triggerEvent = (el, eventType, detail) =>
  el.dispatchEvent(new CustomEvent(eventType, { detail }));

EXAMPLES
triggerEvent(document.getElementById('myId'), 'click');
triggerEvent(document.getElementById('myId'), 'click', { username: 'bob' });
```

####recordAnimationFrames

Invokes the provided callback on each animation frame.

Use recursion. Provided that running is true, continue invoking `window.requestAnimationFrame()` which invokes the provided callback. Return an object with two methods start and stop to allow manual control of the recording. Omit the second argument, autoStart, to implicitly call start when the function is invoked.

```js
const recordAnimationFrames = (callback, autoStart = true) => {
  let running = true,
    raf;
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };
  const start = () => {
    running = true;
    run();
  };
  const run = () => {
    raf = requestAnimationFrame(() => {
      callback();
      if (running) run();
    });
  };
  if (autoStart) start();
  return { start, stop };
};

EXAMPLES
const cb = () => console.log('Animation frame fired');
const recorder = recordAnimationFrames(cb); // logs 'Animation frame fired' on each animation frame
recorder.stop(); // stops logging
recorder.start(); // starts again
const recorder2 = recordAnimationFrames(cb, false); // `start` needs to be explicitly called to begin recording frames
```

####httpsRedirect

Redirects the page to HTTPS if its currently in HTTP. Also, pressing the back button doesn't take it back to the HTTP page as its replaced in the history.

Use `location.protocol` to get the protocol currently being used. If it's not HTTPS, use `location.replace()` to replace the existing page with the HTTPS version of the page. Use location.href to get the full address, split it with `String.prototype.split()` and remove the protocol part of the URL.


```js
const httpsRedirect = () => {
  if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1]);
};

EXAMPLES
httpsRedirect(); // If you are on http://mydomain.com, you are redirected to https://mydomain.com
```

####serializeForm

Encode a set of form elements as a query string.

Use the `FormData` constructor to convert the HTML `form` to `FormData`, `Array.from()` to convert to an array, passing a map function as the second argument. Use `Array.prototype.map()` and `window.encodeURIComponent()` to encode each field's value. Use `Array.prototype.join()` with appropriate arguments to produce an appropriate query string.

```js
const serializeForm = form =>
  Array.from(new FormData(form), field => field.map(encodeURIComponent).join('=')).join('&');

EXAMPLES
serializeForm(document.querySelector('#form')); // email=test%40email.com&name=Test%20Name
```

####formToObject

Encode a set of form elements as an object.

Use the `FormData` constructor to convert the HTML form to `FormData`, `Array.from()` to convert to an array. Collect the object from the array, using `Array.prototype.reduce()`

```js
const formToObject = form =>
  Array.from(new FormData(form)).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value
    }),
    {}
  );

EXAMPLES
formToObject(document.querySelector('#form')); // { email: 'test@email.com', name: 'Test Name' }
```