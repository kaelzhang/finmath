import {
  runner,
  type
} from './lib/runner'


const a = [1, 2, 3, 4, 5]

const CASES = {}

CASES.dma = [
{
  args: [a, 1, 1],
  result: a
},
{
  args: [a, 2, 1],
  result: Array(5)
},
{
  args: [a, 0.5, 1],
  result: [0, 1.5, 2.25, 3.125, 4.0625]
},
{
  args: [a, 0.5],
  result: [1, 1.5, 2.25, 3.125, 4.0625]
}
]

CASES.ma = [
{
  args: [a, 1],
  result: a
},
{
  args: [a, 0.5],
  result: a
},
{
  args: [a],
  result: 3
},
{
  args: [a, 6],
  result: Array(5)
}
]

Object.keys(CASES).forEach(t => {
  CASES[t].map(type(t)).forEach(runner)
})
