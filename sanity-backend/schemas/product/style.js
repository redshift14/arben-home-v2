import { defineType } from 'sanity'
import { MdOutlineStyle as icon } from 'react-icons/md'

export default defineType({
  title: 'Style', 
  name: 'style',
  type: 'document',
  icon,
  fields: [
    {
      title: 'Style name',
      name: 'styleName',
      type: 'localeString'
    }
  ],
  preview: {
    select: {
      title: 'styleName.en'
    }
  }
})