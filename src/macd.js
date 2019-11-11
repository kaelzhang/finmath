import {
  sub,
  mul
} from 'math-array'

import ema from './ema'

export default (
  data,
  slowPeriods = 26,
  fastPeriods = 12,
  signalPeriods = 9
) => {
  const MACD = sub(
    ema(data, fastPeriods),
    ema(data, slowPeriods),
    1
  )

  const signal = ema(MACD, signalPeriods)
  const histogram = mul(2, sub(MACD, signal), 1)

  return {
    MACD,
    signal,
    histogram
  }
}
