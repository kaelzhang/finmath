// Abstract exponential moving average

import {
  isNumber,
  isArray
} from './common'


export default (data, alpha, noHead) => {

  const ret = []

  const length = data.length
  let i = 0
  let s = 0

  if (alpha > 1) {
    return Array(length)
  }

  if (alpha === 1) {
    return data.slice()
  }

  const noArrayAlpha = !isArray(alpha)
  let datum

  for (; i < length; i ++) {
    datum = data[i]

    if (
      isNumber(datum)
      && (
        noArrayAlpha
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

  if (!noArrayAlpha) {
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

  for (; i < length; i++) {
    datum = data[i]

    isNumber(datum)
      ? s =
        ret[i] = alpha * datum + o * s
      : ret[i] = ret[i - 1]
  }

  return ret
}
