import SimpleMovingAverage from './simple'
// import ExponentialMovingAverage from './exponential'
// import WeightedMovingAverage from './weighted'

export function simple (options) {
  return new SimpleMovingAverage(options)
}

export function exponential (options) {
  return new ExponentialMovingAverage(options)
}

export function weighted (options) {
  return new WeightedMovingAverage(options)
}
