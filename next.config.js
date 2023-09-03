/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    reactStrictMode: true,
    images: {
    loader: "akamai",
    path: "/",
    },
}

module.exports = nextConfig
