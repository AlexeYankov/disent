'use client';

import { Center } from '@chakra-ui/react';
import { useAppStore } from '@/entities/app-store';
import { useGetCountries } from '../api/countriesApi';
import Loader from '../ui/loader';

export default function BaseRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAppLoading } = useAppStore();
  // const { data } = useGetCountries();
  // console.log(data)
  return (
    <Center flexDirection={'column'}>
      {isAppLoading && <Loader />}
      {children}
    </Center>
  );
}