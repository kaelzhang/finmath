import {
  // check,
  Adder
} from './common'


// https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average

class ExponentialAdder extends Adder {
  constructor (alpha) {
    super()
    this._alpha = alpha
  }

  _push (value) {
    const alpha = this._alpha
    return alpha * value + (1 - alpha) * this._ma
  }
}


export default function exponential (alpha) {
  return new ExponentialAdder(alpha)
}
