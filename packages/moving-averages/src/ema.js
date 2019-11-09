// Exponential moving average with 86% total weight

import dma from './dma'

export default (data, size) => dma(data, 2 / (size + 1))
