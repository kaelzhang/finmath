[![Build Status](https://travis-ci.org/kaelzhang/finmath.svg?branch=master)](https://travis-ci.org/kaelzhang/finmath)
[![Coverage](https://codecov.io/gh/kaelzhang/finmath/branch/master/graph/badge.svg)](https://codecov.io/gh/kaelzhang/finmath)
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/moving-averages.svg)](http://badge.fury.io/js/moving-averages)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/moving-averages.svg)](https://www.npmjs.org/package/moving-averages)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/kaelzhang/finmath.svg)](https://david-dm.org/kaelzhang/finmath)
-->

# finmath

The complete collection of mathematical utility methods for [FinTech](https://en.wikipedia.org/wiki/Financial_technology) , including:

- [Moving averages](https://en.wikipedia.org/wiki/Moving_average)
- [Bollinger bands](https://en.wikipedia.org/wiki/Bollinger_Bands)
- [Standard deviations](https://en.wikipedia.org/wiki/Standard_deviation)
- Highest high values / Lowest low values

And all finmath methods also handle empty values.

# Table of Contents

- [simple Moving Average (MA)](#simple-moving-average-madata-size)
- [Dynamic weighted Moving Average (DMA)](#dynamic-weighted-moving-average-dmadata-alpha-nohead)
- [Exponential Moving Average (EMA)](#exponential-moving-average-emadata-size)
- [Smoothed Moving Average (SMA)](#smoothed-moving-average-smadata-size-times)
- [Weighted Moving Average (WMA)](#weighted-moving-average-wmadata-size)
- [BOLLinger bands (BOLL)](#bollinger-bands-bolldata-size-times-options)
- [Standard Deviations (SD)](#standard-deviations-sddata-size)
- [Highest High Values (HHV)](#)
- [Lowest Low Values (LLV)](#)

## install

```sh
$ npm i finmath
```

## usage

```js
import {
  ma, dma, ema, sma, wma,
  sd,
  boll
} from 'finmath'

ma([1, 2, 3, 4, 5], 2)
// [<1 empty item>, 1.5, 2.5, 3.5, 4.5]
```

## Simple Moving Average: `ma(data, size)`

```ts
type Data = EmptyableArray<number>
```

- **data** `Data` the collection of data inside which empty values are allowed. Empty values are useful if a stock is suspended.
- **size** `number` the size of the periods.

Returns `Data`

Type `Array<number|Empty>` represents an array of numbers or empty items. And every method of `finmath` does **NOT** accepts items that are not numbers.

```js
[1,, 2, 3] // OK ✅

[1, undefined, 2, 3] // NOT OK ❌

[1, null, 2, 3] // NOT OK ❌
```

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
- **alpha** `Data` the coefficient or list of coefficients `alpha` represents the degree of weighting decrease for each datum.
  - If `alpha` is a number, then the weighting decrease for each datum is the same.
  - If `alpha` larger than `1` is invalid, then the return value will be an empty array of the same length of the original data.
  - If `alpha` is an array, then it could provide different decreasing degree for each datum.
- **noHead** `Boolean=` whether we should abandon the first DMA.

Returns `Data`

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

Returns `Data`

## Smoothed Moving Average: `sma(data, size, times)`

Also known as the modified moving average or running moving average, with `alpha = times / size`.

- **data**
- **size**
- **times?** `Number=1`

Returns `Data`

## Weighted Moving Average: `wma(data, size)`

Calculates convolution of the datum points with a fixed weighting function.

Returns `Data`

## Bollinger Bands: boll(data, size?, times?, options?)

```js
boll([1, 2, 4, 8], 2, 2)
// {
//   upper: [, 2.5, 5, 10],
//   mid  : [, 1.5, 3, 6],
//   lower: [, 0.5, 1, 2]
// }
```

- **data** `Data` the collection of data
- **size?** `Number=20` the period size, defaults to `20`
- **times?** `Number=2` the times of standard deviation between the upper band and the moving average.
- **options?** `Object=` optional options
  - **ma?** `Data=` the moving averages of the provided `datum` and period `size`. This option is used to prevent duplicate calculation of moving average.
  - **sd?** `Data=` the standard average of the provided `datum` and period `size`

Returns `Array<Band>` the array of the `Band` object.

```ts
interface Band {
  // the value of the upper band
  upper: number
  // the value middle band (simple moving average)
  mid: number
  // the value of the lower band
  lower: number
}
```

## Standard deviations: sd(data, size)

- **data** `Data` the collection of data
- **size** `number` the sample size of

Returns `Data` the array of standard deviations.

```js
sd([1, 2, 4, 8], 2)         // [<1 empty item>, 0.5, 1, 2]

sd([1, 2, 3, 4, 5, 6], 4)
// [
//   <3 empty items>,
//   1.118033988749895,
//   1.118033988749895,
//   1.118033988749895
// ]
```

## Highest High Values: hhv(data, periods)

- **data** `Data` the array of closing prices.
- **periods** `Number` the size of periods

Returns `Data` the highest high values of closing prices over the preceding `periods` periods (periods includes the current time).

```js
const array = [1, 2, 4, 1]

hhv(array, 2)    // [, 2, 4, 4]
hhv(array)       // 4
hhv(array, 5)    // [<4 empty items>]
hhv(array, 1)    // [1, 2, 4, 1]

hhv(array, 2)    // [, 1, 2, 2]
```

## Lowest Low Values: llv(data, periods)

Instead, returns `Data` the lowest low values.

## License

[MIT](LICENSE)
