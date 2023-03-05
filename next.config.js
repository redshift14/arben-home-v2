const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-US', 'fr-FR', 'ar-DZ'],
    defaultLocale: 'en-US',
  },
  images: {
    domains: ['cdn.sanity.io']
  }
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)