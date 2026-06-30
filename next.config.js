/** @type {import('next').NextConfig} */
const nextConfig = {
  // three.js necesita transpilación en algunos entornos
  transpilePackages: ['three'],
}

module.exports = nextConfig
