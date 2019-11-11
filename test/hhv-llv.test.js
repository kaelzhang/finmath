import test from 'ava'
import {
  hhv,
  llv
} from '../src'

const methods = {
  hhv,
  llv
}

const a = [1, 2, 4, 1]

const CASES = [
  [
    'hhv',
    [a, 2],
    [, 2, 4, 4]
  ],
  [
    'hhv',
    [a, 1],
    a
  ],
  [
    'hhv',
    [a, 0.5],
    a
  ],
  // [
  //   'hhv',
  //   [a],
  //   4
  // ],
  [
    'hhv',
    [a, 5],
    Array(4)
  ],
  [
    'llv',
    [a, 2],
    [, 1, 2, 1]
  ],
  [
    'llv',
    [a, 1],
    a
  ],
  [
    'llv',
    [a, 0.5],
    a
  ],
  // [
  //   'llv',
  //   [a],
  //   1
  // ],
  [
    'llv',
    [a, 5],
    Array(4)
  ]
]

CASES.forEach(([type, args, expected]) => {
  const d = `${type}: ${JSON.stringify(args)}`

  test(d, t => {
    const result = methods[type](...args)

    if (Object(expected) === expected) {
      t.deepEqual(result, expected)
      return
    }

    t.is(result, expected)
  })
})
