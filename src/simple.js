import {check} from './common'

// @param {Number=datum.length} setSize
export default function simple (...args) {
  const [datum, size] = check(...args)

  return datum.reduce((prev, current, index, array) => {
    if (index < size - 1) {
      prev.sum += current

    } else if (index === size - 1) {
      prev.sum += current
      prev.ma.push(prev.sum / size)

    } else {
      prev.sum += current - array[index - size]
      prev.ma.push(prev.sum / size)
    }

    return prev

  }, {
    sum: 0,
    ma: []
  })
  .ma
}
