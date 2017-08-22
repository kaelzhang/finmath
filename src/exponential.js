import {
  // check,
  Cumulative
} from './common'


// https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average

// EMA(1) = P1
// EMA(n) = a * Pn + (1 - a) * EMA(n-1)

export class ExponentialCumulative extends Cumulative {
  constructor (alpha) {
    super()
    this._alpha = alpha
  }

  _push (value) {
    if (this._ma === 0) {
      return this._ma = value
    }

    const alpha = this._alpha
    return alpha * value + (1 - alpha) * this._ma
  }

  get weight () {
    return 1 - Math.pow(1 - this._alpha, this._length + 1)
  }
}


export default function exponential (datum, alpha) {
  let i = 0
  const cema = new ExponentialCumulative(alpha)
  const length = datum.length

  while (i < length) {
    cema.push(datum[i ++])
  }

  return cema.value
}


exponential.Cumulative = ExponentialCumulative
