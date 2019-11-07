// Smoothed moving average

import dma from './dma'
import {Data} from './types'

export default (data: Data, size: number, times: number = 1) => dma(data, times / size, true)
