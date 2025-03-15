/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '5000',
            pathname: '/uploads/**',
            search: '',
          },
        ],
      },
      logging: {
        fetches: {
          fullUrl: true,
        },
      },
      experimental: {
        ppr: true,
      },
};

export default nextConfig;
