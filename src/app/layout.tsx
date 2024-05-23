import { Metadata } from 'next';
import { DehydratedState, QueryClient } from '@tanstack/react-query';
import Providers from '@/shared/provider/providers';
import BaseRootLayout from '@/shared/layouts/baseRootLayout';
import React from 'react';

export const metadata: Metadata = {
  title: 'Welcome to Disent test App',
  description: 'Main page',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = 'en';
  return (
    <html lang={lang}>
      <body>
        <Providers dehydratedState={{} as DehydratedState} lang={lang}>
          <BaseRootLayout>
           {children}
          </BaseRootLayout>
        </Providers>
      </body>
    </html>
  );
}