// Exponential moving average with 86% total weight

import dma from './dma'
import {Data} from './types'

export default (data: Data, size: number) => dma(data, 2 / (size + 1))
