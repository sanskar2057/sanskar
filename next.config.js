/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Enable static export
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true }, // Required for static exports
  webpack: (config) => {
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      {
        module: /node_modules\/@protobufjs\/inquire/,
        message: /Critical dependency: the request of a dependency is an expression/,
      },
    ];

    return config;
  },
};
module.exports = nextConfig;
