import { defineType } from 'sanity'

export default defineType({
  title: 'Client', 
  name: 'client',
  type: 'object',
  fields: [
    {
      title: 'First name',
      name: 'firstName',
      type: 'string'
    },
    {
      title: 'Last name',
      name: 'lastName',
      type: 'string'
    },
    {
      title: 'Wilaya',
      name: 'wilaya',
      type: 'string'
    },
    {
      title: 'Commune',
      name: 'commune',
      type: 'string'
    },
    {
      title: 'Address',
      name: 'address',
      type: 'string'
    },
    {
      title: 'Phone',
      name: 'phone',
      type: 'string'
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string'
    }
  ]
})