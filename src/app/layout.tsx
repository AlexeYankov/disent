import React from 'react';
import Providers from '@/shared/provider/providers';
import BaseRootLayout from '@/shared/layouts/baseRootLayout';
import { Metadata } from 'next';
import { DehydratedState, QueryClient } from '@tanstack/react-query';
import { countriesApi } from '@/shared/api/countriesApi';

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
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['countries'],
    queryFn: async () =>
      await countriesApi.getCountries().then((res) => {
        return res.data;
      }),
  });
  return (
    <html lang={lang}>
      <body>
        <Providers dehydratedState={{} as DehydratedState} lang={lang}>
          <BaseRootLayout>{children}</BaseRootLayout>
        </Providers>
      </body>
    </html>
  );
}
