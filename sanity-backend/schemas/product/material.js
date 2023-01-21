import { defineType } from 'sanity'

export default defineType({
  title: 'Material used', 
  name: 'materialUsed',
  type: 'object',
  fields: [
    {
      title: 'Material Name',
      name: 'materialName',
      type: 'string',
    },
    {
      title: 'Material Content',
      name: 'materialContent',
      type: 'localeString'
    }
  ]
})