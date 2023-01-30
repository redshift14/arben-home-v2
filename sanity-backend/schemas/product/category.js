import { defineType } from 'sanity'
import { MdOutlineCategory as icon } from 'react-icons/md'

export default defineType({
  title: 'Category',
  name: 'category',
  type: 'document',
  icon,
  fields: [
    {
      title: 'Category name',
      name: 'categoryName',
      type: 'localeString'
    },
  ],
  preview: {
    select: {
      title: 'categoryName.en'
    }
  }
})