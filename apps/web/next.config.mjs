const repo =
  process.env.NEXT_PUBLIC_REPO_NAME ||
  process.env.GITHUB_REPOSITORY?.split('/')[1] ||
  '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: repo ? `/${repo}` : undefined,
  assetPrefix: repo ? `/${repo}/` : undefined,
  images: { unoptimized: true }
};

export default nextConfig;
