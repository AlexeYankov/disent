import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGetCountries } from './countriesApi';
import { instance } from './baseApi';

vi.mock('./baseApi', () => ({
  instance: {
    get: vi.fn(),
  },
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }
  return Wrapper;
}

describe('useGetCountries', () => {
  it('returns data on success', async () => {
    const mockData = [
      { name: { common: 'Germany', official: 'Germany' }, cca2: 'DE', cca3: 'DEU' },
    ];
    (instance.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: mockData,
    });

    const { result } = renderHook(() => useGetCountries(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockData);
  });

  it('returns error on failure', async () => {
    (instance.get as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('Network Error')
    );

    const { result } = renderHook(() => useGetCountries(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it('returns empty array when API responds with empty list', async () => {
    (instance.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: [],
    });

    const { result } = renderHook(() => useGetCountries(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([]);
  });
});