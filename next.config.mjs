/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/study-abroad/:country",
        destination: "/destinations/:country",
      },
      {
        source: "/eligibility-and-documents",
        destination: "/eligibility",
      },
      {
        source: "/calculators/education-loan-emi",
        destination: "/calculator",
      },
    ];
  },
};

export default nextConfig;
