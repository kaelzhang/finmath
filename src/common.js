export function check (datum, size, alpha) {
  size = size === undefined
    ? datum.length
    : size

  if (typeof size !== 'number') {
    throw new TypeError('size must be a number.')
  }

  if (size < 1) {
    throw new TypeError('size must be positive.')
  }

  if (size > datum.length) {
    throw new RangeError('size must be less than datum length.')
  }

  return [datum, size, alpha]
}


export class Cache {
  constructor (cache) {
    this._cache = cache
  }

  get (i) {
    return this._cache[i]
  }

  set (i, v) {
    this._cache[i] = v
  }
}


Cache.Readonly = class extends Cache {
  set () {}
}


export class Period {
  constructor (size, {
    cache
  }) {

    this._size = size
    this._ma = undefined
    this._sum = 0
    this._length = 0
    this._cache = cache || new Cache
  }

  get value () {
    return this._ma
  }

  get length () {
    return this._length
  }

  push (value) {
    const index = this._length ++
    const length = index + 1
    const size = this._size

    return this._ma = length > size

      // 3. When after
      ? this._then(value, index)
      : length === size

        // 2. When is about to
        ? this._first(value, index)

        // 1. If the size of the collection is less than ma size
        : this._prepare(value, index)
  }
}


export class Cumulative {
  constructor () {
    this._ma = 0
    this._length = 0
  }

  get value () {
    return this._ma
  }

  get length () {
    return this._length
  }

  push (value) {
    return this._ma = this._push(value)
  }
}
