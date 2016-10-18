export default class MovingAverage {
  constructor ({
    n,

    // method to get the data from datum
    get
  }) {

    this._getter = get
    this._n = n

    // the latter offset
    this._last_head = null
    // the latest offset
    this._head = null

    this._head_value = null
    this._ma
  }

  head (n, value) {
    if (this._head) {
      this._last_head = this._head
    }

    this._head = n
    this._head_value = value

    return this
  }

  _calculate (list) {
    throw new Error('_calculate should be implemented.')
  }

  // collect data to be calculated.
  _collect () {
    let i = this._head
    const list = []

    while (-- i > 0) {
      list.push(this._getter(this._head - i))
    }

    const isPromise = list[0] instanceof Promise

    if (this._head_value) {
      list.push(
        isPromise
          ? Promise.resolve(this._head_value)
          : this._head_value
      )
    }

    return {
      list,
      isPromise
    }
  }

  _calculatePromises (list) {
    return Promise.all(list).then((list) => {
      return this._calculate(list)
    })
  }

  value () {
    const {
      list,
      isPromise
    } = this._collect()

    return isPromise
      ? this._calculatePromises(list)
        .then((ma) => {
          return this._ma = ma
        })
      : this._ma = this._calculate(list)
  }
}
