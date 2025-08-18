import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'

// import { Space_Grotesk } from 'next/font/google'
// import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider, SearchConfig } from 'pliny/search'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
// import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'
import { LangProviders } from './lang-providers'
import MyPlayer from '@/components/MyAudioPlayer/MyAudioPlayerBtn'
// const space_grotesk = Space_Grotesk({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-space-grotesk',
// })

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'zh_CN',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={siteMetadata.language}
      // className={`${space_grotesk.variable} scroll-smooth`}
      className={`scroll-smooth`}
      suppressHydrationWarning={true}
    >
      <link rel="icon" type="image/png" sizes="196x196" href="/static/favicons/favicon-196.png" />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <body
        suppressHydrationWarning={true} // MARK 可以解决 hydration mismatch
        className=" bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white"
      >
        <ThemeProviders>
          <LangProviders>
            {/* <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} /> */}
            <SectionContainer>
              <div className="bg-white dark:bg-gray-950 md:flex md:flex-row md:justify-center">
                <div className="md:w-full md:min-w-[512px] md:max-w-2xl">
                  {/* MARK 这里修改字体 */}
                  <div className="relative flex h-full min-h-screen max-w-2xl flex-col justify-between px-8 py-24 font-mono">
                    <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
                      <Header />
                      <main className="mb-auto pb-24">{children}</main>
                      {siteMetadata.trackList ? (
                        <MyPlayer trackList={siteMetadata.trackList} />
                      ) : (
                        <MyPlayer />
                      )}

                      {/* MARK Footer */}
                      {/* <Footer /> */}
                    </SearchProvider>
                  </div>
                </div>
              </div>
            </SectionContainer>
          </LangProviders>
        </ThemeProviders>
      </body>
    </html>
  )
}
