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

## Usage

```js
import {
  simple,
  exponential,
  cumulative
} from 'moving-averages'

// Simple Moving Average
// `simple()` receives item into the collection,
// calculates the sma(simple moving average) of the whole collection
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
e.push(1)
e.value

// Cumulative Moving Average
const c = cumulative()
c.push(1)
c.value
```

### exponential(alpha)

- **alpha** `Number` represents the degree of weighting decrease, i.e. the constant smoothing factor between `0` and `1`. A higher `alpha` discounts older observations faster.


## For Simple Moving Averages

### simple.averages(datum, [size])

- **datum** `Array.<Number>` the datum
- **size** `Number=` the size of the data period. Defaults to the length of the `datum`

Returns `Array.<Number>`

```js
simple.averages([1, 2, 3, 4, 5], 3)     // [2, 3, 4]

// `size` default to the length of the list
simple.averages([1, 2, 3, 4, 5])        // [3]
```

### new simple.Period(size, {cache})

- **size** `Number` the size of the period
- **cache** `simple.Cache=` for most cases, it is unnecessary.

returns `Array.<Number>`

```js
// `simple.mover(3)` only calculates the sma of the latest 3 items
const period = new simple.Period(3)
period.push(1)  // undefined, there is only one(less than 3) item in the collection, skip calculating
period.push(2)  // undefined
period.push(3)  // 2
period.push(4)  // 3, the sma of [2, 3, 4], 1 is abandoned
period.value    // 3
```

### interface `simple.Cache`

The purpose of `simple.Cache` is to reuse existing data and avoid unnecessary memory cost.

- **get** `function(index)`
- **set** `function(index, value)`

```js
const datum = [1, 2, 3, 4, 5]
const cache = {
  set () {},
  get: i => datum[i]
}
const period = new simple.Period(3, {cache})

datum.forEach(value => {
  console.log(period.push(value))
})

// undefined
// undefined
// 2
// 3
// 4
```

## License

MIT
