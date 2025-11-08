/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "inspirationdesigns.ca",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cloudstorage.storage.iran.liara.space",
        pathname: "**",
      },
    ],
  },
};

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});

module.exports = nextConfig;
