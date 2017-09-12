// Dynamic Weighted Moving Average

import {
  isNumber,
  isArray
} from './common'


// @param {Number|Array.<Number>} weight
export default (data, weight, noHead) => {

  const length = data.length

  if (weight > 1) {
    return Array(length)
  }

  if (weight === 1) {
    return data.slice()
  }

  const noArrayWeight = !isArray(weight)
  const ret = []

  let datum

  // period `i`
  let i = 0

  // `s` is the value of the DWMA at any time period `i`
  let s = 0

  // Handles head
  for (; i < length; i ++) {
    datum = data[i]

    if (
      isNumber(datum)
      && (
        noArrayWeight
        || isNumber(datum)
      )
    ) {

      ret[i] = noHead
        ? 0
        : datum

      s = datum
      i ++

      break
    }
  }

  // Dynamic weights: an array of weights
  // Ref:
  // https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average
  // with a dynamic alpha
  if (!noArrayWeight) {
    for (; i < length; i ++) {
      datum = data[i]

      isNumber(datum) && isNumber(weight[i])
        ? s =
          ret[i] = weight[i] * datum + (1 - weight[i]) * s
        : ret[i] = ret[i - 1]
    }

    return ret
  }

  const o = 1 - weight

  // Fixed weight
  for (; i < length; i++) {
    datum = data[i]

    isNumber(datum)
      ? s =
        ret[i] = weight * datum + o * s
      : ret[i] = ret[i - 1]
  }

  return ret
}
