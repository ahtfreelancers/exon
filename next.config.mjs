/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_BASE_URL: process.env.API_BASE_URL,
        AUTH_SECRET: process.env.AUTH_SECRET,
    },
    images: {
        domains: ['res.cloudinary.com', 'localhost'],
    },
};

export default nextConfig;
