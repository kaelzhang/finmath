import {
  add,
  sub,
  mul
} from 'math-array'

import deviation from './sd'
import ma from './ma'

export default (datum, size = 20, times = 2, {
  ma: avg,
  sd
} = {}) => {
  avg = avg || ma(datum, size)
  sd = sd || deviation(datum, size)

  const timesSd = mul(sd, times)

  return {
    upper: add(avg, timesSd),
    mid: avg,
    lower: sub(avg, timesSd)
  }
}
