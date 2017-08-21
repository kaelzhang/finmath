import {
  Period
} from './common'


class WeightedPeriod extends Period {
  constructor (size, options) {
    super(size, options)

    this._numerator = 0
    this._datum = []
    this._denominator = denominator(size)
  }

  _prepare (value, index) {
    this._sum += value
    this._datum.push(value)
  }

  _first (value, index) {
    const datum = this._datum
    datum.push(value)
    this._numerator = numerator(datum)
    this._datum = null
    return this._numerator / this._denominator
  }

  _then (value, index) {
    this._numerator += this._size * value - this._sum
    this._sum += value - this._cache.get(index - size)
    return this._numerator / this._denominator
  }
}


function numerator (datum) {
  let numerator = 0
  let i = 0
  const n = datum.length

  while (i < n) {
    numerator += datum[i] * ++ i
  }

  return numerator
}


function denominator (size) {
  return n * (n + 1) / 2
}


export default function weighted (datum) {
  return numerator(datum) / denominator(datum.length)
}


weighted.Period = WeightedPeriod
