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
  simple
} from 'moving-averages'

simple([1, 2, 3, 4, 5], 3)     // [2, 3, 4]

// `size` default to the length of the list
simple([1, 2, 3, 4, 5])        // [3]


// `simple.adder()` receives item into the collection, calculates the sma(simple moving average) of the whole collection
const adder = simple.adder()
adder.push(1)  // 1
adder.push(2)  // 1.5
adder.push(3)  // 2
adder.push(4)  // 2.5
adder.value    // 2.5, the sma
adder.length   // 4,   the length of the collection


// `simple.mover(3)` only calculates the sma of the latest 3 items
const mover = simple.mover(3)
mover.push(1)  // undefined, there is only one(less than 3) item in the collection, skip calculating
mover.push(2)  // undefined
mover.push(3)  // 2
mover.push(4)  // 3, the sma of [2, 3, 4], 1 is abandoned
mover.value    // 3
```

### simple(datum, size)

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
