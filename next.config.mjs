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
    // Configure file upload size limits
    api: {
        bodyParser: {
            sizeLimit: "10mb",
        },
    },
    // Image optimization for form headers
    images: {
        domains: ["localhost", "your-domain.com"],
        formats: ["image/webp", "image/avif"],
    },
};

export default nextConfig;
