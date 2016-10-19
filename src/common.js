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
