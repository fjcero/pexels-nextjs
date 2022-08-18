/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["www.pexels.com", "images.pexels.com"],
  },
};

export default nextConfig;
