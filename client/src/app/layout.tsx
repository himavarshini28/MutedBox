import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'MutedBox - Anonymous Feedback Platform',
  description: 'Collect and manage anonymous feedback with beautiful, unique links',
  keywords: ['feedback', 'anonymous feedback', 'feedback collection', 'anonymous reviews'],
  authors: [{ name: 'MutedBox Team' }],
  creator: 'MutedBox',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mutedbox.com',
    title: 'MutedBox - Anonymous Feedback Platform',
    description: 'Collect anonymous feedback with unique links',
    siteName: 'MutedBox',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MutedBox - Anonymous Feedback Platform',
    description: 'Collect anonymous feedback with unique links',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">    
      <body className={`${inter.className} bg-background text-text min-h-screen flex flex-col`}>
        <AuthProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
