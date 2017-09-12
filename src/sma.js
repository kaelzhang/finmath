// Smoothed moving average

import dma from './dma'

export default (data, size, times = 1) => dma(data, times / size, 1)
