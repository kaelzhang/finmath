import {
  // check,
  Cumulative
} from './common'


// https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average

export class ExponentialCumulative extends Cumulative {
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

}


exponential.Cumulative = ExponentialCumulative
