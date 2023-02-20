import { defineType } from 'sanity'

export default defineType({
  title: 'Model',
  name: 'model',
  type: 'object',
  fields: [
    {
      title: 'Quantity',
      name: 'quantity',
      type: 'number'
    },
    {
      title: 'Price',
      name: 'price',
      type: 'number'
    },
    {
      title: 'Size',
      name: 'size',
      type: 'string'
    }
  ]
})