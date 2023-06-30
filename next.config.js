/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverActions: true
  }
};

module.exports = nextConfig;
