import sanityClient  from '@sanity/client'
import imageUrlBuilder from  '@sanity/image-url'

export const client = sanityClient({
  projectId: 'kqw3bgrd',
  dataset: 'development',
  apiVersion: '2022-01-21',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
})

const builder = imageUrlBuilder(client)

export const fetchDocumentByType = (type) => {
  return client.fetch(`*[_type == '${type}']`).then((data) => data[0])
}

export const urlFor = (source) => builder.image(source)

// apiVersion: '2022-11-29',
