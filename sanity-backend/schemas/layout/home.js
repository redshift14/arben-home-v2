import { defineType } from 'sanity'

export default defineType({    
  title: 'Home page',
  name: 'homePage',
  type: 'object',
  fields: [
    {
      title: 'Header section',
      name: 'headerSection',
      type: 'array',
      of: [{ 
        type: 'object',
        fields: [
          {
            title: 'Main text',
            name: 'mainText',
            type: 'localeString'
          },
          {
            title: 'Secondary text',
            name: 'secondaryText',
            type: 'localeString'
          },
          {
            title: 'Cover image',
            name: 'coverImage',
            type: 'image'
          },
        ]
      }]
    },
    {
      title: 'Introduction section',
      name: 'introSection',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            title: 'Intro main text',
            name: 'introMainText',
            type: 'localeString'
          },
          {
            title: 'Intro secondary text',
            name: 'introSecondaryText',
            type: 'localeString'
          },
        ]
      }]
    },
    {
      title: 'Categories section',
      name: 'categoriesSection',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            title: 'Category name',
            name: 'interfaceCategoryName',
            type: 'localeString'
          },
          {
            title: 'Category link',
            name: 'catLinkTo',
            type: 'string'
          },
          {
            title: 'Category image',
            name: 'interfaceCategoryImage',
            type: 'image'
          }
        ]
      }]
    },
    {
      title: 'About section text',
      name: 'aboutSectionText',
      type: 'localeText'
    }
  ]
})