/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: process.env.NODE_ENV === "production" ? false : true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "demo.altairattic.net",
        pathname: "/**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: "https://demo.altairattic.net/car-dealer-2/api/v1",
    API_KEY: "6208323ff9b15fdb27b2b9ee9924ac1208b9044df650b52ddf5bb8f19d32b5a4",
  },
}

export default nextConfig
