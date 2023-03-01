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
    },
    {
      title: 'Faq page',
      name: 'faqPage',
      type: 'faqPage'
    },
    {
      title: 'Contact page showcase image',
      name: 'contactPageShowcaseImage',
      type: 'image'
    },
    {
      title: 'Checkout page showcase image',
      name: 'checkoutPageShowcaseImage',
      type: 'image'
    },
    {
      title: 'About page showcase image',
      name: 'aboutPageShowcaseImage',
      type: 'image'
    },
    {
      title: 'Delivery notes',
      name: 'deliveryNotes',
      type: 'localeText'
    }
  ],
  preview: {
    select: {
      title: 'layoutName'
    }
  }
})