import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'VanDeFi - DeFi Wallet',
  description: 'Your all-in-one DeFi portfolio manager and wallet',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💎</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-text-primary antialiased">
        <Providers>
          <div className="flex min-h-screen">
            {/* Sidebar - desktop only */}
            <Sidebar />
            {/* Main content area */}
            <div className="flex-1 flex flex-col min-h-screen md:ml-64">
              <Header />
              <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6">
                {children}
              </main>
            </div>
          </div>
          {/* Mobile bottom nav */}
          <MobileNav />
        </Providers>
      </body>
    </html>
  );
}

function MobileNav() {
  'use client';
  return null; // MobileNav is rendered client-side inside Sidebar component
}
