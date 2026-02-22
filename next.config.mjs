/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        // destination: "http://localhost:8000/api/v1/:path*",
        // destination: "https://api-journalhub.onrender.com/api/v1/:path*",
        destination:`${process.env.NEXT_PUBLIC_API_URL}/api/v1/:path*`
      },
    ]
  },
}

export default nextConfig
