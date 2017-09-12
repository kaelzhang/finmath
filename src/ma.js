// simple moving average

import {
  isNumber
} from './common'


export default (data, size) => {
  const length = data.length

  if (!size) {
    return data.reduce((a, b) => a + b) / length
  }

  if (size <= 1) {
    return data.slice()
  }

  if (size > length) {
    return Array(length)
  }

  const prepare = size - 1
  const ret = []
  let sum = 0
  let i = 0
  let counter = 0
  let datum

  for (; i < length && counter < prepare; i ++) {
    datum = data[i]

    if (isNumber(datum)) {
      sum += datum
      counter ++
    }
  }

  for (; i < length; i ++) {
    datum = data[i]

    if (isNumber(datum)) {
      sum += datum
    }

    if (isNumber(data[i - size])) {
      sum -= data[i - size]
    }

    ret[i] = sum / size
  }

  return ret
}
