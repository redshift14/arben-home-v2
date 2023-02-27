import product from './product/product'
import model from './product/model'
import category from './product/category'
import material from './product/material'
import style from './product/style'
import color from './product/color'

import layout from './layout/layout'
import home from './layout/home'
import faq from './layout/faq'

import client from './order/client'
import order from './order/order'
import productOrder from './order/productOrder'

import { localeBlock } from './locale/localeBlock'
import { localeText } from './locale/localeText'
import { localeString } from './locale/localeString'

export const schemaTypes = [
  localeBlock, 
  localeString,
  localeText,

  client,
  productOrder,
  order,

  faq,
  home,
  layout,

  color,
  style,
  material,
  category,
  model,
  product
]
