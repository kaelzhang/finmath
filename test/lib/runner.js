import test from 'ava'

import {
  dma,
  ma,
  sma,
  ema,
  wma
} from '../../src'

const methods = {
  dma,
  ma,
  sma,
  ema,
  wma
}


export const only = true

const to_fixed_10 = n => n.toFixed(10)

export const get_test = o => o ? test.only : test

export const type = t => obj => {
  obj.type = t
  return obj
}

export function runner (c) {
  const {type: tt} = c
  const [
    args,
    result,
    o
  ] = c

  const d_args = JSON.stringify(args)
  const d = `${tt}(${d_args})`

  get_test(o)(d, t => {
    const r = methods[tt](...args)

    if (Array.isArray(result)) {
      t.deepEqual(r.map(to_fixed_10),
        result.map(to_fixed_10))
      return
    }

    t.is(to_fixed_10(r), to_fixed_10(result))
  })
}
