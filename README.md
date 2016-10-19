[![Build Status](https://travis-ci.org/kaelzhang/moving-averages.svg?branch=master)](https://travis-ci.org/kaelzhang/moving-averages)
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/moving-averages.svg)](http://badge.fury.io/js/moving-averages)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/moving-averages.svg)](https://www.npmjs.org/package/moving-averages)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/kaelzhang/moving-averages.svg)](https://david-dm.org/kaelzhang/moving-averages)
-->

# moving-averages

Utility methods for [Moving average](https://en.wikipedia.org/wiki/Moving_average)

## Install

```sh
$ npm install moving-averages --save
```

## Usage

```js
const {
  simple,
  exponential,
  weighted,     // what's comming ...

} = require('moving-averages')

simple([1, 2, 3, 4, 5], 3)     // [2, 3, 4]
simple([1, 2, 3, 4, 5])        // [3], `size` default to the length of the list
```

### simple(datum, size)

returns `Array.<Number>`

- **datum** `Array.<Number>` the datum
- **size** `Number=` the data period

### exponential(datum, size, alpha)

returns `Array.<Number>`

- **alpha** `Number` represents the degree of weighting decrease, i.e. the constant smoothing factor between `0` and `1`. A higher `alpha` discounts older observations faster.


## License

MIT
