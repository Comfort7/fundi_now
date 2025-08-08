/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [],
  },
  trailingSlash: false,
  poweredByHeader: false,
}

module.exports = nextConfig
