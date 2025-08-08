import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: {
    default: 'Fundi Now - Find Local Service Providers',
    template: '%s | Fundi Now'
  },
  description: 'Connect with verified local service providers. From plumbing to TV mounting, find skilled fundis in your area.',
  keywords: ['fundi', 'plumber', 'electrician', 'cleaner', 'handyman', 'Kenya', 'local services'],
  authors: [{ name: 'Fundi Now Team' }],
  creator: 'Fundi Now',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://fundinow.vercel.app',
    siteName: 'Fundi Now',
    title: 'Fundi Now - Find Local Service Providers',
    description: 'Connect with verified local service providers in Kenya.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Fundi Now - Local Service Providers',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fundi Now - Find Local Service Providers',
    description: 'Connect with verified local service providers in Kenya.',
    images: ['/og-image.jpg'],
    creator: '@fundinow',
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
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-black text-white px-4 py-2 z-50 focus-visible-only"
        >
          Skip to main content
        </a>
        
        <div className="flex flex-col min-h-screen">
          <Navbar />
          
          <main id="main-content" className="flex-1">
            {children}
          </main>
          
          <Footer />
        </div>
        
        {/* Loading indicator for page transitions */}
        <div id="loading-indicator" className="hidden fixed top-0 left-0 w-full h-1 bg-black z-50">
          <div className="h-full bg-white animate-pulse"></div>
        </div>
      </body>
    </html>
  )
}