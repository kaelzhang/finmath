import MovingAverage from './base'

export default class SimpleMovingAverage extends MovingAverage {

  _calculate (list) {
    this._list = list

    return list.reduce((prev, current) => {
      return prev + current

    }, 0) / list.length
  }
}
