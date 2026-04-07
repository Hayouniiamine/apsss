import createNextIntlPlugin from 'next-intl/plugin';

// Explicit path helps avoid runtime resolution issues on Vercel/ESM environments.
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default withNextIntl(nextConfig)
