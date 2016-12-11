# babel-plugin-compile-cheddar

Optimizes `.forEach` and `.map` statements to `for` stements

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

```javascript
require('babel').transform('code', {
  plugins: ['loop-optimizer']
});
```

## Bugs?

Now you may say "wait, wait, wait!" This optimizes on things that aren't just arrays! My `map#forEach` is optimized too! To fix this, add a comment that says `// O: KEEP` right before the line on which you use the `forEach`. Examples:

```
var m = new Map();
// O: KEEP
m.forEach(f)
```

or:

```
var s = new Set();
// O: KEEP
for (var i = 0; i < 5; s.forEach(f)) {
    // ...
}
```

This is required since it is not possible to determine an object's type at runtime.

## Example

```js
function timesTwo(arr) {
	return arr.map(n => n * 2);
}
```
to:
```js
function timesTwo(arr) {
    var _a = arr;
    var _f = n => n * 2;
    var _r = [];

    for (var _i = 0; _i < _a.length; _i++)
        _a[_i].push(_f(_a[_i], _i, _a));

    return _r;
}
```
