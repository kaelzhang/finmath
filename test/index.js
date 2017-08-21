import test from 'ava'
import {
  simple
} from '../src'

const ma = {
  simple
}

const datum = [1, 2, 3, 4, 5]

const CUMULATIVE_CASES = [
{
  datum,
  result: [1, 1.5, 2, 2.5, 3]
}
]

const SIMPLE_PERIODS_CASES = [
  {
    datum,
    result: [3]
  },
  {
    datum,
    size: 5,
    result: [3]
  },
  {
    datum,
    size: 1,
    result: datum
  },
  {
    datum,
    size: 2,
    result: [1.5, 2.5, 3.5, 4.5]
  },
  {
    datum,
    size: 0,
    error: true
  },
  {
    datum,
    size: -1,
    error: true
  },
  {
    datum,
    size: 7,
    error: true
  },
  {
    datum,
    size: {},
    error: true
  }
]

function simple_periods_runner ({
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


function cumulative_runner ({
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


SIMPLE_PERIODS_CASES.forEach(simple_periods_runner)
CUMULATIVE_CASES.forEach(cumulative_runner)
