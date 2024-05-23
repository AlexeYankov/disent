'use client';

import {
  ChakraBaseProvider,
  extendTheme,
} from '@chakra-ui/react';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { StyleFunctionProps, mode } from '@chakra-ui/theme-tools';
import 'react-toastify/dist/ReactToastify.css';

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        fontFamily: 'body',
        lineHeight: 'base',
        overflowY: 'scroll',
      },

      colors: {
        accent: {
          '--color-accent-100': '#bea6ff',
          '--color-accent-300': '#a280ff',
          '--color-accent-500': '#8c61ff',
          '--color-accent-700': '#704ecc',
          '--color-accent-900': '#382766',
        },
        success: {
          '--color-success-100': '#80ffbf',
          '--color-success-300': '#22e584',
          '--color-success-500': '#14cc70',
          '--color-success-700': '#0f9954',
          '--color-success-900': '#0a6638',
        },
        danger: {
          '--color-danger-100': '#ff8099',
          '--color-danger-300': '#f23d61',
          '--color-danger-500': '#cc1439',
          '--color-danger-700': '#990f2b',
          '--color-danger-900': '#660a1d',
        },
        warning: {
          '--color-warning-100': '#ffd073',
          '--color-warning-300': '#e5ac39',
          '--color-warning-500': '#d99000',
          '--color-warning-700': '#960',
          '--color-warning-900': '#640',
        },
        info: {
          '--color-info-100': '#73a5ff',
          '--color-info-300': '#4c8dff',
          '--color-info-500': '#397df6',
          '--color-info-700': '#2f68cc',
          '--color-info-900': '#234e99',
        },

        light: {
          '--color-light-100': '#fff',
          '--color-light-300': '#f9f7ff',
          '--color-light-500': '#f4f2fa',
          '--color-light-700': '#dcdae0',
          '--color-light-900': '#c3c1c7',
        },
        dark: {
          '--color-dark-100': '#808080',
          '--color-dark-300': '#4c4c4c',
          '--color-dark-500': '#333',
          '--color-dark-700': '#171717',
          '--color-dark-900': '#333',
        },
      },
    }),
  },
});

function Providers({
  children,
  lang,
  dehydratedState,
}: React.PropsWithChildren & {
  dehydratedState: DehydratedState;
  lang: string;
}) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 35 * 1000,
            refetchInterval: 35 * 1000,
          },
        },
      })
  );
  return (
    <ChakraBaseProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          {children}
        </HydrationBoundary>
      </QueryClientProvider>
    </ChakraBaseProvider>
  );
}

export default Providers;
