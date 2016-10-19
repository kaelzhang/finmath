'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exponential;

// [ref](https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average)
function exponential(list, size) {}

// export default class ExponentialMovingAverage extends MovingAverage {

//   static alpha (t, pt) {
//     return 1 - exp(- (t - pt) / timespan)
//   }

//   constructor ({
//     // the degree of weighting decrease
//     a,
//     ...options
//   }) {
//     super(options)

//     this._alpha = a
//   }

//   _calculate () {

//   }
// }


var exp = Math.exp;
var pow = Math.pow;
var E = Math.E;

function squared(n) {
  return Math.pow(n, 2);
}

exports = module.exports = function MovingAverage(timespan) {
  if (typeof timespan != 'number') throw new Error('must provide a timespan to the moving average constructor');

  if (timespan <= 0) throw new Error('must provide a timespan > 0 to the moving average constructor');

  var ma; // moving average
  var v = 0; // variance
  var nSamples = 0;

  var previousTime;
  var ret = {};

  ret.push = function push(time, value) {
    nSamples++;
    if (previousTime) {

      // calculate moving average
      var a = alpha(time, previousTime);
      var previousMa = ma;
      ma = a * value + (1 - a) * ma;

      // calculate variance
      v = v + (value - previousMa) * (value - ma);
    } else {
      ma = value;
    }

    previousTime = time;
  };

  // Exponential Moving Average

  ret.movingAverage = function movingAverage() {
    return ma;
  };

  // Variance
  ret.variance = function variance() {
    return v / nSamples;
  };

  return ret;
};