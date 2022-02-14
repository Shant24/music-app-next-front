const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
  images: {
    disableStaticImages: true,
  },
  webpack: (config) => {
    return config;
  },
};

module.exports = withPlugins([withImages], nextConfig);
