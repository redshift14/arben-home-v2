import { defineType } from 'sanity'

import { MdOutlineProductionQuantityLimits as icon } from 'react-icons/md'

export default defineType({
  title: 'Product',
  name: 'product',
  type: 'document',
  icon,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Product Name',
      name: 'name',
      type: 'localeString'
    },
    {
      title: 'Slug', 
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 90
      }
    },
    {
      title: 'Product Subtitle',
      name: 'subtitle',
      type: 'localeString'
    },
    {
      title: 'Categories',
      name: 'categories',
      type: 'array',
      of: [{ 
        type: 'reference',
        to: [
          { type: 'category' }
        ]
      }]
    },
    {
      title: 'Models',
      name: 'models',
      type: 'array',
      of: [{ type: 'model' }]
    },
    {
      title: 'Styles',
      name: 'styles',
      type: 'array',
      of: [{ 
        type: 'reference',
        to: [
          { type: 'style' }
        ] 
      }]
    },
    {
      title: 'Materials Used',
      name: 'materialsUsed',
      type: 'array',
      of: [{ 
        type: 'reference',
        to: [
          { type: 'materialUsed' }
        ] 
      }]
    },
    {
      title: 'Colors',
      name: 'colors',
      type: 'array',
      of: [{ 
        type: 'reference',
        to: [
          { type: 'color' }
        ] 
      }]
    },
    {
      title: 'Care',
      name: 'care',
      type: 'localeText'
    },
    {
      title: 'Description', 
      name: 'description',
      type: 'localeBlock', 
    },
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        hotspot: true
      }
    },
    {
      title: 'Preview image',
      name: 'previewImage',
      type: 'image'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'previewImage'
    }
  }
})