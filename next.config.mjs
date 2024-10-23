/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'www.shutterstock.com', // Add this entry to allow Shutterstock images
            },
        ],
    },
};

export default nextConfig;