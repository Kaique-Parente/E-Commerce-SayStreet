/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains:["res.cloudinary.com"]
    },
    compiler: {
        styledComponents: true,
    }
};

export default nextConfig;
