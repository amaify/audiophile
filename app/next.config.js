/* eslint-disable import/no-extraneous-dependencies */
/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com"]
  }
};

module.exports = withBundleAnalyzer(nextConfig);
