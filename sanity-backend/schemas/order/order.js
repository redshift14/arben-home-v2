import { defineType } from 'sanity'
import { MdOutlineRequestPage as icon } from 'react-icons/md'

export default defineType({
  title: 'Order',
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
    },
    {
      title: 'Notes', 
      name: 'notes',
      type: 'text'
    },
    {
      title: 'Issued',
      name: 'issued',
      type: 'boolean'
    },
    {
      title: 'Delivered',
      name: 'delivered',
      type: 'boolean'
    }
  ],
  preview: {
    select: {
      title: 'client.lastName',
      subtitle: 'client.address'
    }
  }
})