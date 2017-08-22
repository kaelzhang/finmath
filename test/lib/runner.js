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


export const only = true

const to_fixed_10 = n => n.toFixed(10)

export const get_test = only => only ? test.only : test

export function runner ({
  datum,
  type = 'simple',
  result,
  args = [],
  only
}) {

  const d_args = [JSON.stringify(datum), ...args].join(', ')
  const d = `${type}(${d_args})`

  get_test(only)(d, t => {
    const r = ma[type](datum, ...args)
    t.is(to_fixed_10(r), to_fixed_10(result))
  })
}


export function period_runner ({
  datum,
  type = 'simple',
  size,
  result,
  only
}) {

  if (typeof size !== 'number' || size < 1 || size > datum.length) {
    return
  }

  const d = `new ${type}.Period(${size}), ${JSON.stringify(datum)}`

  get_test(only)(d, t => {

    const period = new ma[type].Period(size)
    const r = datum
    .map((p, i) => {
      const m = period.push(p)

      t.is(m, period.value, 'value should match')
      t.is(period.length, i + 1, 'length should match')

      return m
    })
    .filter(Boolean)

    t.deepEqual(r.map(to_fixed_10), result.map(to_fixed_10))
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

  get_test(only)(d, t => {

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
  args = [],
  only,
  extra = {}
}) {

  const d = `new ${type}.Cumulative(${args.join(', ')}), ${JSON.stringify(datum)}`

  get_test(only)(d, t => {
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
