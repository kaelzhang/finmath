import {
  check,
  Cache,
  Period,
  Cumulative,
  periodsFactory
} from './common'

// MAsimple = (N1 + ... + Nn) / n

class SimpleCumulative extends Cumulative {
  constructor () {
    super()
    this._sum = 0
  }

  push (value) {
    const sum = this._sum += value
    return this._ma = sum / ++ this._length
  }
}


class SimplePeriod extends Period {
  _prepare (value, index) {
    this._sum += value
  }

  _first (value, index) {
    return (this._sum += value) / this._size
  }

  _then (value, index) {
    const size = this._size
    return (this._sum += value - this._cache.get(index - size)) / size
  }
}


export default function simple (datum) {
  const length = datum.length
  let i = 0
  let sum = 0

  while (i < length) {
    sum += datum[i ++]
  }

  return sum / length
}


simple.Period = SimplePeriod
simple.Cumulative = SimpleCumulative
simple.Cache = Cache

simple.periods = periodsFactory((size, datum) => {
  return new SimplePeriod(size, {
    cache: new Cache.Readonly(datum)
  })
})
