const {
  Suite
} = require('benchmark')

const {
  simple
} = require('..')


const isNumber = subject => typeof subject === 'number'


function ma (datum, n) {
  var r = datum.length, i = 0, a = -1, o = 0, s = 0, l = [];
  if (0 >= n)
    return s = datum.reduce(function (prev, current) {
      return prev + current;
    }), s / r;

  if (1 >= n)
    return datum.slice();

  if (n > r)
    return Array(r);

  for (; r > i && n - 1 > o;)
    isNumber(datum[i]) && (s += datum[i], o++), i++;

  for (; r > i; i++, a++)
    isNumber(datum[i]) && (s += datum[i]), isNumber(datum[i - n]) && (s -= datum[i - n]), l[i] = s / n;

  return l;
}


// const suite = new Suite
const datum = []

let i = 0
while (i < 1000) {
  datum.push(i ++)
}


const suite = new Suite

suite
.add('simple.periods', () => {
  simple.periods(datum, 20)
})
.add('ma', () => {
  ma(datum, 20)
})
.on('complete', function () {
  console.log(this[0].stats.mean)
  console.log(this[1].stats.mean)
  console.log('Fastest is ' + this.filter('fastest').map('name'))
})
.run({
  async: true
})
