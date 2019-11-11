import test from 'ava'
import {sd} from '../src'

[
  [
    [1, 2, 3, 4, 5], 2,
    [, 0.5, 0.5, 0.5, 0.5]
  ],

  [
    [1, 2, 4, 8], 2,
    [, 0.5, 1, 2]
  ]
].forEach(([datum, size, expected]) => {
  test(`datum: ${JSON.stringify(datum)}, size: ${size}`, t => {
    const result = sd(datum, size)
    t.deepEqual(result, expected)
  })
})
