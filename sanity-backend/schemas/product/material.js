import { defineType } from 'sanity'
import { SiMaterialdesign as icon } from 'react-icons/si'

export default defineType({
  title: 'Material used', 
  name: 'materialUsed',
  type: 'document',
  icon,
  fields: [
    {
      title: 'Material name',
      name: 'materialName',
      type: 'localeString'
    }
  ],
  preview: {
    select: {
      title: 'materialName.en'
    }
  }
})