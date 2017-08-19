import {check} from './common'

// [ref](https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average)
export default function exponential (...args) {
  const [datum, size, alpha] = check(...args)

  return datum.reduce((prev, current, index, array) => {
    if (index === 0) {
      prev.prev = current

    } else {
      prev.prev = alpha * current + (1 - alpha) * prev.prev
    }

    if (index > size - 2) {
      prev.ma.push(prev.prev)
    }

    return prev

  }, {
    prev: null,
    ma: []
  })
  .ma
}


exponential.adder = (alpha) => {
  let m = 0
  let length = 0

  return {
    get value () {
      return m
    },

    get length () {
      return length
    },

    push (value) {
      ++ length
      return m = alpha * value + (1 - alpha) * m
    }
  }
}
