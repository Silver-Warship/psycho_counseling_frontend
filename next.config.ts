import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true, // 开启严格模式，有助于发现潜在问题
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://172.30.236.30:8080/api/:path*',
      },
    ];
  },
};

export default nextConfig;
