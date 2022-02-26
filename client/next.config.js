/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BACK_URL: process.env.NEXT_PUBLIC_BACK_URL,
    NEXT_PUBLIC_LOCAL_URL: process.env.NEXT_PUBLIC_LOCAL_URL,
    COINHUB_TOKEN: process.env.COINHUB_TOKEN,
    COINHUB_USERID: process.env.COINHUB_USERID,
  },
};

module.exports = nextConfig;
