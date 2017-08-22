import test from 'ava'

import {
  simple,
  weighted,
  exponential
} from '../../src'

const ma = {
  simple,
  weighted,
  exponential
}


const to_fixed_10 = n => n.toFixed(10)

export function runner ({
  datum,
  type = 'simple',
  result
}) {

  const d = `${type}(${JSON.stringify(datum)})`

  test(d, t => {
    const r = ma[type](datum)
    t.is(to_fixed_10(r), to_fixed_10(result))
  })
}


export function periods_runner ({
  datum,
  type = 'simple',
  size,
  result,
  error,
  only

}) {

  const original_size = size
  const datum_copy = [].concat(datum)

  size = size === undefined
    ? datum.length
    : size

  const d = `${type}.periods(datum=${JSON.stringify(datum)}, size=${original_size}), has error: ${!!error}`

  const m = ma[type].periods

  const _test = only ? test.only : test

  _test(d, t => {

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

    t.deepEqual(r.map(to_fixed_10), result.map(to_fixed_10))
    t.deepEqual(datum_copy, datum)
  })
}


export function cumulative_runner ({
  datum,
  type = 'simple',
  result,
  args = []
}) {

  const d = `new ${type}.Cumulative(${args.join(', ')}), ${JSON.stringify(datum)}`
  test(d, t => {
    const cumulative = new ma[type].Cumulative(...args)
    const calculated = datum.reduce((prev, current, i) => {
      cumulative.push(current)
      prev.push(cumulative.value)

      t.is(cumulative.length, i + 1, 'wrong length')

      return prev
    }, [])

    t.deepEqual(calculated, result, 'wrong result')
  })
}
