'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = simple;

// @param {Number=list.length} setSize
function simple(list, size) {
  size = size === undefined ? list.length : size;

  if (typeof size !== 'number') {
    throw new TypeError('size must be a number.');
  }

  if (size < 1) {
    throw new TypeError('size must be positive.');
  }

  if (size > list.length) {
    throw new RangeError('size must be less than list length.');
  }

  return list.reduce(function (prev, current, index, array) {
    if (index < size - 1) {
      prev.sum += current;
    } else if (index === size - 1) {
      prev.sum += current;
      prev.ma.push(prev.sum / size);
    } else {
      prev.sum += current - array[index - size];
      prev.ma.push(prev.sum / size);
    }

    return prev;
  }, {
    sum: 0,
    ma: []
  }).ma;
}