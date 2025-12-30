/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disabled to reduce noise from Next.js Image component's fetchPriority warnings
  // Removed 'output: "export"' to allow API routes (server-side functionality)
  // API routes require a server and cannot be used with static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
