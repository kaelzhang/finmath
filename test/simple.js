import {
  cumulative_runner,
  periods_runner,
  period_runner,
  runner,
  only
} from './lib/runner'

const datum = [1, 2, 3, 4, 5]

const CUMULATIVE_CASES = [
{
  datum,
  result: [1, 1.5, 2, 2.5, 3]
}
]

const SIMPLE_PERIODS_CASES = [
  {
    datum,
    result: [3]
  },
  {
    datum,
    size: 5,
    result: [3]
  },
  {
    datum,
    size: 1,
    result: datum
  },
  {
    datum,
    size: 2,
    result: [1.5, 2.5, 3.5, 4.5]
  },
  {
    datum,
    size: 0,
    error: true
  },
  {
    datum,
    size: -1,
    error: true
  },
  {
    datum,
    size: 7,
    error: true
  },
  {
    datum,
    size: {},
    error: true
  }
]


const CASES = [
{
  datum: [1, 2, 3],
  result: 2
},
{
  datum: [1, 2, 3, 4],
  result: 2.5
}
]


CASES.forEach(runner)
SIMPLE_PERIODS_CASES.forEach(periods_runner)
SIMPLE_PERIODS_CASES.forEach(period_runner)
CUMULATIVE_CASES.forEach(cumulative_runner)
