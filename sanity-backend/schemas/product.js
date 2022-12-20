export const product = {
  title: 'Product',
  name: 'product',
  type: 'document',
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
        source: 'name',
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
      of: [{ type: 'string' }]
    },
    {
      title: 'Quantity',
      name: 'quantity',
      type: 'number',
    },
    {
      title: 'Price',
      name: 'price',
      type: 'array',
      of: [{ type: 'number' }]
    },
    {
      title: 'Sizes',
      name: 'sizes',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      title: 'Styles',
      name: 'styles',
      type: 'array',
      of: [
        {
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
        }
      ]
    },
    {
      title: 'Materials Used',
      name: 'materialsUsed',
      type: 'array',
      of: [
        {
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
        }
      ]
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
    }
  ],
  preview: {
    select: {
      title: 'title',
    }
  }
}