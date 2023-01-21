import { defineType } from 'sanity'

export default defineType({
  title: 'Style', 
  name: 'style',
  type: 'object',
  fields: [
    {
      title: 'Style Name',
      name: 'styleName',
      type: 'string',
    },
    {
      title: 'Style Content',
      name: 'styleContent',
      type: 'localeString'
    }
  ]
})