import test from 'ava'

import {
  simple
} from '../../src'

const ma = {
  simple
}


export function periods_runner ({
  datum,
  type = 'simple',
  size,
  result,
  error

}) {

  const original_size = size
  const datum_copy = [].concat(datum)

  size = size === undefined
    ? datum.length
    : size

  const d = `${type}: ${JSON.stringify(datum)}, size=${original_size}, has error: ${!!error}`

  const m = ma[type].periods

  test(d, t => {

    let e
    let r

    try {
      r = m(datum, size)
      e = false

    } catch (err) {
      if (!error) {
        throw err
      }

      return
    }

    t.deepEqual(r, result)
    t.deepEqual(datum_copy, datum)
  })
}


export function cumulative_runner ({
  datum,
  type = 'simple',
  result
}) {

  const d = `${type}.adder: ${JSON.stringify(datum)}`
  test(d, t => {
    const cumulative = new ma[type].Cumulative()
    const calculated = datum.reduce((prev, current, i) => {
      cumulative.push(current)
      prev.push(cumulative.value)

      t.is(cumulative.length, i + 1, 'wrong length')

      return prev
    }, [])

    t.deepEqual(calculated, result, 'wrong result')
  })
}
