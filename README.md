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

Utility methods for [Moving average](https://en.wikipedia.org/wiki/Moving_average).

## Install

```sh
$ npm install moving-averages --save
```

## Usage `simple`

```js
import {
  simple,
  exponential,
  cumulative
} from 'moving-averages'

// Simple Moving Average
// `simple()` receives item into the collection, calculates the sma(simple moving average) of the whole collection
const s = simple()
s.push(1)  // 1
s.push(2)  // 1.5
s.push(3)  // 2
s.push(4)  // 2.5
s.value    // 2.5, the sma
s.length   // 4,   the length of the collection

// Exponential Moving Average
// for details of the parameter `alpha`, see:
// https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average
const e = exponential(alpha)

// Cumulative Moving Average
const c = cumulative()
```

## For Simple Moving Averages

### new simple.Mover(datum, size)

returns `Array.<Number>`

- **datum** `Array.<Number>` the datum
- **size** `Number=` the data period

#### simple.adder()
#### simple.adder(size)

### exponential(datum, size, alpha)

returns `Array.<Number>`

- **alpha** `Number` represents the degree of weighting decrease, i.e. the constant smoothing factor between `0` and `1`. A higher `alpha` discounts older observations faster.


## License

MIT
