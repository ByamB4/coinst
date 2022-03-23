/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    COINHUB_TOKEN: process.env.COINHUB_TOKEN,
    COINHUB_USERID: process.env.COINHUB_USERID,
    COINHUB_API_KEY: process.env.COINHUB_API_KEY,
    COINHUB_API_SECRET: process.env.COINHUB_API_SECRET,
  },
};

module.exports = nextConfig;
