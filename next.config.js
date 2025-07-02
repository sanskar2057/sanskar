/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Enable static export
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true }, // Required for static exports
};
module.exports = nextConfig;