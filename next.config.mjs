/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.tmdb.org"], // Replace with your image host domain
  },
  env: {
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  },
};

export default nextConfig;
