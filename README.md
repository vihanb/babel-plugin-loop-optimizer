# babel-plugin-loop-optimizer

**WARNING:** This package is **unmaintained**. It probably still works but I am not able to maintain it. If anyone wishes to pick this up leave an issue and I can give access.

Also, that package aren't working with newest Babel (that have @babel namespace) right now.

Optimizes `.forEach`, `.every`, `.find`, `.map`, `.filter` statements to `for` stements

## Installation

```sh
$ npm install babel-plugin-loop-optimizer
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["babel-plugin-loop-optimizer"]
}
```

### Via CLI

```sh
$ babel --plugins loop-optimizer script.js
```

### Via Node API

```js
require('babel').transform('code', {
  plugins: ['loop-optimizer']
});
```

## Bugs?

Now you may say "wait, wait, wait!" This optimizes on things that aren't just arrays! My `map#forEach` is optimized too! To fix this, add a comment that says `// O: KEEP` right before the line on which you use some optimized function. Examples:

```js
var m = new Map();
// loop-optimizer: KEEP
m.forEach(f)
```

or:

```js
var s = new Set();
// loop-optimizer: KEEP
for (var i = 0; i < 5; s.forEach(f)) {
    // ...
}
```

This is required since it is not possible to determine an object's type at compile-time.

Also, if you don't want reverse order, you can disable this (optimization) behavior by adding comment `// loop-optimizer: FORWARD` right before the line on which you use some optimized function. Example:
```js
let ar = [1, 2, 3]
// loop-optimizer: FORWARD
ar.forEach(console.log)
```

## Example

```js
function timesTwo(arr) {
	return arr.map(n => n * 2);
}
```
to:
```js
function timesTwo(arr) {
    let _a = arr;
    let _f = n => n * 2;
    let _r = [];

    for (let _i = _a.length; _i--;)
        _r.push(_f(_a[_i], _i, _a));

    return _r;
}
```

---

If you need any other help, don't hesitate to leave an issue
