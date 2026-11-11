import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 requires an explicit allowlist; 75 is the default sweet spot for
    // large photographic backgrounds, 90 for logos that need crisp edges.
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "https://lavivenzia.com/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
