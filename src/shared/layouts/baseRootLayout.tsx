'use client';

import { Center } from '@chakra-ui/react';
import { useAppStore } from '@/entities/app-store';
import Loader from '../ui/loader';

export default function BaseRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAppLoading } = useAppStore();
  return (
    <Center flexDirection={'column'}>
      {isAppLoading && <Loader />}
      {children}
    </Center>
  );
}