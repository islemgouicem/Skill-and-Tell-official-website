/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "skillandtell-website-cms-omuq.vercel.app",
      },
    ],
  },
};

export default nextConfig;