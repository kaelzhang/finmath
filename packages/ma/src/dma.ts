// Dynamic Weighted Moving Average

import {
  isNumber,
  isArray
} from './common'
import {Data, Datum} from './types'

// @param {Number|Array.<Number>} alpha
export default function (
  data: Data,
  alpha: Data | number,
  noHead: boolean = false
): Data {

  const {length} = data

  if (alpha > 1) {
    return Array(length)
  }

  if (alpha === 1) {
    return data.slice()
  }

  const notArrayWeight = !isArray(alpha)
  const ret = []

  let datum: Datum

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
        notArrayWeight
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
  if (!notArrayWeight) {
    for (; i < length; i ++) {
      datum = data[i]

      isNumber(datum) && isNumber(alpha[i])
        ? s =
          ret[i] = alpha[i] * datum + (1 - alpha[i]) * s
        : ret[i] = ret[i - 1]
    }

    return ret
  }

  const a = alpha as number
  const o = 1 - a

  // Fixed alpha
  for (; i < length; i++) {
    datum = data[i]

    isNumber(datum)
      ? s =
        ret[i] = a * datum + o * s
      : ret[i] = ret[i - 1]
  }

  return ret
}
