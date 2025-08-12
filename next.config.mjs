/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        esmExternals: true,
    },
    env: {
        MONGODB_URI: process.env.MONGODB_URI,
        JWT_SECRET: process.env.JWT_SECRET,
    },
    // Image optimization for form headers
    images: {
        domains: ["localhost", "your-domain.com"],
        formats: ["image/webp", "image/avif"],
    },
};

export default nextConfig;
