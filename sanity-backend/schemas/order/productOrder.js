import { defineType } from 'sanity'

export default defineType({
  title: 'Product order',
  name: 'productOrder',
  type: 'object',
  fields: [
    {
      title: 'Product ID',
      name: 'productID',
      type: 'string'
    },
    {
      title: 'Product title',
      name: 'productTitle',
      type: 'string'
    },
    {
      title: 'Size',
      name: 'size',
      type: 'string'
    },
    {
      title: 'Price',
      name: 'price',
      type: 'string'
    },
    {
      title: 'Quantity',
      name: 'quantity',
      type: 'number'
    },
  ]
})