import {
  runner,
  type
} from './lib/runner'


;[
{
  args: [[1, 2, 3, 4, 5], 1, 1],
  result: [1, 2, 3, 4, 5]
},
{
  args: [[1, 2, 3, 4, 5], 2, 1],
  result: Array(5)
},
{
  args: [[1, 2, 3, 4, 5], 0.5, 1],
  result: [0, 1.5, 2.25, 3.125, 4.0625]
},
{
  args: [[1, 2, 3, 4, 5], 0.5],
  result: [1, 1.5, 2.25, 3.125, 4.0625]
}
]
.map(type('dma'))
.forEach(runner)
