const repo = process.env.NEXT_PUBLIC_REPO_NAME || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: repo ? `/${repo}` : undefined,
  assetPrefix: repo ? `/${repo}/` : undefined,
  images: { unoptimized: true }
};

export default nextConfig;
