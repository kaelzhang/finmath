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

The complete collection of utility methods for [Moving average](https://en.wikipedia.org/wiki/Moving_average), including:

- simple moving average (SMA)
- cumulative moving average (CMA)
- exponential moving average (EMA)
- weighted moving average (WMA)

## install

```sh
$ npm i moving-averages
```

## usage

```js
import {
  ma
} from 'moving-averages'

ma([1, 2, 3, 4, 5], 2)    // [1.5, 2.5, 3.5, 4.5]
```


MIT
