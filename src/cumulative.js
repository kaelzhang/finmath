import {
  // check
  Adder
} from './common'


export default function cumulative () {
  return new CumulativeAdder()
}


class CumulativeAdder extends Adder {
  _push (value) {
    const ma = this._ma
    return ma + (value - ma) / ++ this._length
  }
}
