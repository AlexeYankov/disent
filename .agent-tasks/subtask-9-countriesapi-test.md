Создай новый файл `src/shared/api/countriesApi.test.tsx` со следующим содержимым (файла раньше не было, создай его):

```tsx
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
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
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
```

Что сделать:
1. Создай файл `src/shared/api/countriesApi.test.tsx` с содержимым из блока выше, один в один.
2. Больше никаких файлов не трогай и не создавай.

Готово когда:
- файл `src/shared/api/countriesApi.test.tsx` существует и содержит ровно этот код.

Действуй так: edit_file src/shared/api/countriesApi.test.tsx сразу с указанным содержимым (файл новый, читать перед этим не нужно). Не запускай tsc/npx/eslint/npm test/vitest.

/no_think
