import { defineType } from 'sanity'
import { AiOutlineLayout as icon } from 'react-icons/ai'

export default defineType({
  title: 'Layout',
  name: 'layout',
  type: 'document',
  icon,
  fields: [
    {
      title: 'Layout name',
      name: 'layoutName',
      type: 'string'
    },
    {
      title: 'Home page',
      name: 'homePage',
      type: 'homePage'
    }
  ],
  preview: {
    select: {
      title: 'layoutName'
    }
  }
})