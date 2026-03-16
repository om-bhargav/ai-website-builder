/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**", // Use wildcard to match any path
      },
    ],
  },
};

export default nextConfig;
