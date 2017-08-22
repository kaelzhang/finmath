import {
  periods_runner,
  runner
} from './lib/runner'

const only = true

function w (c) {
  c.type = 'weighted'
  return c
}

;[
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
.map(w)
.forEach(periods_runner)


;[
{
  datum: [1, 2, 3],
  result: 14 / 6
}
]
.map(w)
.forEach(runner)
