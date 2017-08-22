import {
  cumulative_runner,
  runner,
  only
} from './lib/runner'


function e (c) {
  c.type = 'exponential'
  return c
}

;[
{
  datum: [1, 2],
  args: [0.5],
  result: 1.5
}
]
.map(e)
.forEach(runner)


;[
{
  datum: [1, 2],
  args: [0.5],
  result: [1, 1.5],
  extra: {
    weight: [0.5, 0.75]
  }
}
]
.map(e)
.forEach(cumulative_runner)
