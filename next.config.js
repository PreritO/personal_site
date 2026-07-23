/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // permanent: true emits 308s (not 301s) — SEO-equivalent.
      { source: '/posts', destination: '/writing', permanent: true },
      { source: '/posts/:slug', destination: '/writing/:slug', permanent: true },
    ]
  },
}

module.exports = nextConfig
