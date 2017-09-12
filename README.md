[![Build Status](https://travis-ci.org/kaelzhang/moving-averages.svg?branch=master)](https://travis-ci.org/kaelzhang/moving-averages)
[![Coverage](https://codecov.io/gh/kaelzhang/moving-averages/branch/master/graph/badge.svg)](https://codecov.io/gh/kaelzhang/moving-averages)
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

The complete collection of [FinTech](https://en.wikipedia.org/wiki/Financial_technology) utility methods for [Moving average](https://en.wikipedia.org/wiki/Moving_average), including:

- [simple moving average (MA)](#simple-moving-average-madata-size)
- [dynamic weighted moving average (DMA)](#dynamic-weighted-moving-average-dmadata-alpha-nohead)
- [exponential moving average (EMA)](#exponential-moving-average-emadata-size)
- [smoothed moving average (SMA)](#smoothed-moving-average-smadata-size-times)
- [weighted moving average (WMA)](#weighted-moving-average-wmadata-size)

And `moving-averages` will also handle empty values.

## install

```sh
$ npm i moving-averages
```

## usage

```js
import {
  ma, dma, ema, sma, wma
} from 'moving-averages'

ma([1, 2, 3, 4, 5], 2)    
// [<1 empty item>, 1.5, 2.5, 3.5, 4.5]
```

## Simple Moving Average: `ma(data, size)`

- **data** `Array.<Number|undefined>` the collection of data inside which empty values are allowed. Empty values are useful if a stock is suspended.
- **size** `Number` the size of the periods.

Returns `Array.<Number|undefined>`

#### Special Cases

```js
// If the size is less than `1`
ma([1, 2, 3], 0.5)       // [1, 2, 3]

// If the size is larger than data length
ma([1, 2, 3], 5)         // [<3 empty items>]

ma([, 1,, 3, 4, 5], 2)   
// [<2 empty items>, 0.5, 1.5, 3.5, 4.5]
```

And all of the other moving average methods have similar mechanism.

## Dynamic Weighted Moving Average: `dma(data, alpha, noHead)`

- **data**
- **alpha** `Number|Array.<Number>` the coefficient or list of coefficients `alpha` represents the degree of weighting decrease for each datum.
  - If `alpha` is a number, then the weighting decrease for each datum is the same.
  - If `alpha` larger than `1` is invalid, then the return value will be an empty array of the same length of the original data.
  - If `alpha` is an array, then it could provide different decreasing degree for each datum.
- **noHead** `Boolean=` whether we should abandon the first DMA.

Returns `Array.<Number|undefined>`

```js
dma([1, 2, 3], 2)    // [<3 empty items>]

dma([1, 2, 3], 0.5)  // [1, 1.5, 2.25]

dma([1, 2, 3, 4, 5], [0.1, 0.2, 0.1])  
// [1, 1.2, 1.38]
```

## Exponential Moving Average: `ema(data, size)`

Calulates the most frequent used exponential average which covers about 86% of the total weight (when `alpha = 2 / (N + 1)`).

- **data**
- **size** `Number` the size of the periods.

Returns `Array.<Number|undefined>`

## Smoothed Moving Average: `sma(data, size, times)`

Also known as the modified moving average or running moving average, with `alpha = times / size`.

- **data**
- **size**
- **times** `Number=1`

Returns `Array.<Number|undefined>`

## Weighted Moving Average: `wma(data, size)`

Calculates convolution of the datum points with a fixed weighting function.

Returns `Array.<Number|undefined>`

## Related FinTech Modules

- [bollinger-bands](https://www.npmjs.com/package/bollinger-bands): Fintach math utility to calculate bollinger bands.
- [s-deviation](https://www.npmjs.com/package/s-deviation): Math utility to calculate standard deviations.
- [moving-averages](https://www.npmjs.com/package/moving-averages): The complete collection of utility methods for [Moving average](https://en.wikipedia.org/wiki/Moving_average).

MIT
