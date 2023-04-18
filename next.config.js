/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.google.com", "c1.wallpaperflare.com", "i.ibb.co"],
  },
  experimental: {
    largePageDataBytes: 128 * 1024 * 1024,
    forceSwcTransforms: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
