import {
  check,
  Cache,
  Period,
  Cumulative
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


class SimpleCache extends Cache {
  set () {}
}


// @param {Number=datum.length} setSize
function periods (...args) {
  const [datum, size] = check(...args)

  const mover = new SimplePeriod(size, {
    cache: new SimpleCache(datum)
  })

  return datum.reduce((prev, current) => {
    const ma = prev.mover.push(current)
    if (ma) {
      prev.sma.push(ma)
    }

    return prev

  }, {
    mover,
    sma: []
  })
  .sma
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
simple.periods = periods
simple.Cache = Cache
