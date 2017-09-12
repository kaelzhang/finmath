// Dynamic Weighted Moving Average

import {
  isNumber,
  isArray
} from './common'


// @param {Number|Array.<Number>} alpha
export default (data, alpha, noHead) => {

  const length = data.length

  if (alpha > 1) {
    return Array(length)
  }

  if (alpha === 1) {
    return data.slice()
  }

  const noArrayWeight = !isArray(alpha)
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

      isNumber(datum) && isNumber(alpha[i])
        ? s =
          ret[i] = alpha[i] * datum + (1 - alpha[i]) * s
        : ret[i] = ret[i - 1]
    }

    return ret
  }

  const o = 1 - alpha

  // Fixed alpha
  for (; i < length; i++) {
    datum = data[i]

    isNumber(datum)
      ? s =
        ret[i] = alpha * datum + o * s
      : ret[i] = ret[i - 1]
  }

  return ret
}
