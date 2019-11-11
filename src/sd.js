import ma from './ma'

export default (data, size) => {
  const {length} = data
  const avg = ma(data, size)
  const ret = []

  let i = size - 1
  let j
  let sum

  for (; i < length; i ++) {
    sum = 0
    j = i - size + 1

    for (; j <= i; j ++) {
      sum += (data[j] - avg[i]) ** 2
    }

    ret[i] = Math.sqrt(sum / size)
  }

  return ret
}
