const test = require('ava')
const {
  simple
} = require('..')

test('simple', t => {
  const sma = simple({
    n: 5,
    get: (m) => {
      return m
    }
  })
  .head(10)

  t.is(sma.value(), 8)
})
