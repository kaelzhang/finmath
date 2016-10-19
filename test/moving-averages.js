const test = require('ava')
const ma = require('..')

const datum = [1, 2, 3, 4, 5]

const cases = [
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
  }
]

function run ({
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

  const m = ma[type]

  test(d, t => {

    let e
    let r

    try {
      r = m(datum, size)
      e = false

    } catch (err) {
      e = true
    }

    t.is(e, !!error)

    if (!error) {
      t.deepEqual(r, result)
      t.deepEqual(datum_copy, datum)
    }
  })
}

cases.forEach(run)
