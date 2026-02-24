const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname),
  async rewrites() {
    return [
      {
        source: '/front/api/v1/:path*',
        destination: 'http://localhost:8086/front/api/v1/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
