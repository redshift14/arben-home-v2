import { defineType } from 'sanity'
import { MdOutlineRequestPage as icon } from 'react-icons/md'

export default defineType({
  title: 'Oder',
  name: 'order',
  type: 'document',
  icon,
  fields: [
    {
      title: 'Client',
      name: 'client',
      type: 'client'
    },
    {
      title: 'Products',
      name: 'product',
      type: 'array',
      of: [{
        type: 'productOrder',
      }]
    },
    {
      title: 'Delivery cost',
      name: 'deliveryCost',
      type: 'number'
    },
    {
      title: 'Subtotal',
      name: 'subtotal',
      type: 'number'
    },
    {
      title: 'Total',
      name: 'total',
      type: 'number'
    }
  ]
})