/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: process.env.NODE_ENV === 'production' ? '/magic-invisible-phone-charger' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/magic-invisible-phone-charger/' : '',
  trailingSlash: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'tailwindcss': require.resolve('tailwindcss')
    }
    return config
  }
}

module.exports = nextConfig 