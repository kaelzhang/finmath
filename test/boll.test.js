import test from 'ava'

import {sd, ma, boll} from '../src'

const data = [1, 2, 4, 8]
const size = 2
// const times = 2

const expected = {
  upper: [, 2.5, 5, 10],
  mid: [, 1.5, 3, 6],
  lower: [, 0.5, 1, 2]
}

const CASES = [
  {
    d: 'normal, default times, no options',
    data,
    size,
    expect: expected
  },

  {
    d: 'options.ma',
    data,
    size: 2,
    expect: expected,
    options: {
      ma: ma(data, size)
    }
  },

  {
    d: 'options.sd',
    data,
    size: 2,
    expect: expected,
    options: {
      sd: sd(data, size)
    }
  }
]

CASES.forEach(({
  d,
  data: dd,
  size: s,
  times,
  expect,
  options
}) => {
  test(d, t => {
    const result = options
      ? boll(dd, s, times, options)
      : boll(dd, s, times)

    t.deepEqual(result, expect)
  })
})
