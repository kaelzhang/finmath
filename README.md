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

The complete collection of utility methods for [Moving average](https://en.wikipedia.org/wiki/Moving_average), including:

- simple moving average (SMA)
- cumulative moving average (CMA)
- exponential moving average (EMA)
- modified moving average (MMA), also known as running moving average (RMA), smoothed moving average (SMMA)

## Install

```sh
$ npm install moving-averages
```

## Simple Moving Average (SMA): `simple(datum)`

- **datum** `Array.<Number>` the collection of data

Returns `Number` the unweighted mean of the datum.

```js
import {
  simple,
  // exponential,
  // cumulative,
  // weighted
} from 'moving-averages'

simple([1, 2, 3, 4, 5])  // 3
```

### Cumulative Moving Average (of SMA): `simple.cumulative()`

Actually, CMA is **NOT** a new kind of moving averages.

```js
const cma = simple.cumulative()
cma.push(1)
// 1, receives a new data from the datum stream,
// and returns the average of all of the data up util the current datum point

cma.push(2)  // 1.5
cma.push(3)  // 2
cma.push(4)  // 2.5
cma.value    // 2.5, the average util the current datum point
cma.length   // 4  , the length of the data received
```

## Exponential Moving Average: `exponential(datum, alpha)`

```js
import {
  exponential
} from 'moving-averages'
```

### exponential.cumulative(alpha)

- **alpha** `Number` represents the degree of weighting decrease, i.e. the constant smoothing factor between `0` and `1`. A higher `alpha` discounts older observations faster.

Creates the cumulative collector of exponential moving average.

```js
const ema = exponential.cumulative(alpha)
ema.push(1)  // 1
ema.push(3)  //
ema.value
```

## Weighted Moving Average: `weighted(datum)`

```js
import {
  weighted
} from 'moving-averages'

weighted()
```

### ~~weighted.cumulative()~~


## Modified Moving Average: `modified(datum)`


### ~~modified.cumulative()~~


## More for Simple Moving Averages

### new simple.Period(size, {cache})

- **size** `Number` the size of the period
- **cache** `simple.Cache=` for most cases, it is unnecessary.

Creates a `size`-periods calculator for simple moving average.

```js
// `simple.mover(3)` only calculates the sma of the latest 3 items
const period = new simple.Period(3)
period.push(1)  // undefined, there is only one(less than 3) item in the collection, skip calculating
period.push(2)  // undefined
period.push(3)  // 2
period.push(4)  // 3, the sma of [2, 3, 4], 1 is abandoned
period.value    // 3
```

### simple.averages(datum, [size])

- **datum** `Array.<Number>` the datum
- **size** `Number=` the size of the data period. Defaults to the length of the `datum`

Calculates multiple SMA periods simultaneously, and returns `Array.<Number>`

```js
simple.averages([1, 2, 3, 4, 5], 3)     // [2, 3, 4]

// `size` default to the length of the list
simple.averages([1, 2, 3, 4, 5])        // [3]
```

### interface `simple.Cache`

- **get** `function(index)`
- **set** `function(index, value)`

The purpose of `simple.Cache` is to reuse existing data and avoid unnecessary memory cost.

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
