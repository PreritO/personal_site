/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // permanent: true emits 308s (not 301s) — SEO-equivalent.
      { source: '/posts', destination: '/writing', permanent: true },
      { source: '/posts/:slug', destination: '/writing/:slug', permanent: true },
      // Removed sections (2026-07): temporary redirects in case old links
      // circulate — becomes permanent (or a page again) if the removal sticks.
      { source: '/thoughts', destination: '/', permanent: false },
      { source: '/projects', destination: '/', permanent: false },
    ]
  },
}

module.exports = nextConfig
