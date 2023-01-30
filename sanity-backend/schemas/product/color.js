import { defineType } from 'sanity'
import { VscSymbolColor as icon } from 'react-icons/vsc'

export default defineType({
  title: 'Color',
  name: 'color',
  type: 'document',
  icon,
  fields: [
    {
      title: 'Color name',
      name: 'colorName',
      type: 'localeString'
    }
  ],
  preview: {
    select: {
      title: 'colorName.en'
    }
  }
})