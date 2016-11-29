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
