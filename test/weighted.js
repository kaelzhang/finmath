import {
  periods_runner,
  period_runner,
  runner,
  only
} from './lib/runner'


function w (c) {
  c.type = 'weighted'
  return c
}

const CASE_PERIODS = [
{
  datum: [1, 2, 3],
  size: 2,
  result: [5 / 3, 8 / 3]
},
{
  datum: [1, 2],
  result: [5 / 3]
}
]

CASE_PERIODS
.map(w)
.forEach(periods_runner)

CASE_PERIODS
.map(w)
.forEach(period_runner)


;[
{
  datum: [1, 2, 3],
  result: 14 / 6
}
]
.map(w)
.forEach(runner)
