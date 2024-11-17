const { withContentlayer } = require('next-contentlayer2')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app analytics.umami.is;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src *.s3.amazonaws.com;
  connect-src *;
  font-src 'self';
  frame-src giscus.app
`

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Content-Security-Policy',
    value: "frame-ancestors 'self' https://giscus.app",
  },
  {
    key: 'X-Frame-Options',
    value: 'ALLOW-FROM https://giscus.app',
  },
]

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = () => {
  const isDev = process.env.NODE_ENV === 'development'
  const isBuild = process.env.NODE_ENV === 'production'
  const plugins = [withContentlayer, withBundleAnalyzer]

  return (
    // withNextIntl(nextConfig),
    plugins.reduce((acc, next) => next(acc), {
      reactStrictMode: true,
      pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
      eslint: {
        dirs: ['app', 'components', 'layouts', 'scripts'],
      },
      images: {
        unoptimized: true,
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'picsum.photos',
          },
        ],
      },
      // async headers() {
      //   return [
      //     {
      //       source: '/(.*)',
      //       headers: securityHeaders,
      //     },
      //   ]
      // },
      webpack: (config, options) => {
        config.module.rules.push({
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        })
        config.module.rules.push({
          test: /\.riv$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000,
            },
          },
        })
        return config
      },
      env: {
        IS_BUILD: isBuild.toString(),
        IS_DEV: isDev.toString(),
      },
      // publicRuntimeConfig: {
      //   staticFolder: '/_next', // 将/myStaticFolder文件夹视为静态文件夹
      // },
      // basePath: '/wxmvv.github.io',
      output: 'export',
      basePath: '',
      assetPrefix: '',
      // exportTrailingSlash: true,
      trailingSlash: true,
    })
  )
}
