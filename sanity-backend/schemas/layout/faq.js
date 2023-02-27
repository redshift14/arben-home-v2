import { defineType } from 'sanity'

export default defineType({
  title: 'Faqs page',
  name: 'faqPage',
  type: 'object',
  fields:[
    {
      title: 'Showcase image',
      name: 'showcaseImage',
      type: 'image'
    },
    {
      title: 'Questions & answers',
      name: 'questionsAndAnswers',
      type: 'array',
      of: [{
        type: 'object',
        fields: [          
          {
            title: 'Question',
            name: 'question',
            type: 'localeString'
          },
          {
            title: 'Answer',
            name: 'answer',
            type: 'localeText'
          }
        ]
      }]
    }
  ]
})