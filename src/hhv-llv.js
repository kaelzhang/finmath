// @param {Number} start index to start [
// @param {Number} end index less than )
// -> [start, end)
const reduce = (array, start, end, reducer) => {
  let prev
  let i = start

  for (; i < end; i ++) {
    if (i in array) {
      if (prev === undefined) {
        prev = array[i]
        continue
      }

      prev = reducer(prev, array[i])
    }
  }

  return prev
}

const compare = (data, size, comparer) => {
  const {length} = data

  if (size > length) {
    return Array(length)
  }

  if (!size) {
    return data.reduce(comparer)
  }

  if (size <= 1) {
    return data.slice()
  }

  let i = size - 1
  const ret = []

  for (; i < length; i ++) {
    ret[i] = reduce(data, i - size + 1, i + 1, comparer)
  }

  return ret
}

export const hhv = (data, size) =>
  compare(data, size, (a, b) => Math.max(a, b))

export const llv = (data, size) =>
  compare(data, size, (a, b) => Math.min(a, b))
