Создай новый файл `src/shared/helpers/useInfinity.test.tsx` со следующим содержимым (файла раньше не было, создай его):

```tsx
import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { useInifinity } from './useInfinity';
import { CountryType } from '@/entities/types';

class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

beforeEach(() => {
  // @ts-expect-error test stub for jsdom, which has no IntersectionObserver
  global.IntersectionObserver = MockIntersectionObserver;
});

function makeItems(count: number): CountryType[] {
  return Array.from({ length: count }, (_, i) => ({
    name: { common: `Country ${i}`, official: `Country ${i}` },
    cca2: `C${i}`,
    cca3: `C${i}${i}${i}`,
  }));
}

describe('useInifinity', () => {
  it('shows first page of items', () => {
    const items = makeItems(50);
    const { result } = renderHook(() => useInifinity(items));
    expect(result.current.visibleItems).toHaveLength(20);
    expect(result.current.hasMore).toBe(true);
  });

  it('loads more items via loadMore', () => {
    const items = makeItems(50);
    const { result } = renderHook(() => useInifinity(items));
    act(() => {
      result.current.loadMore();
    });
    expect(result.current.visibleItems).toHaveLength(40);
  });

  it('reports no more items once all are visible', () => {
    const items = makeItems(10);
    const { result } = renderHook(() => useInifinity(items));
    expect(result.current.visibleItems).toHaveLength(10);
    expect(result.current.hasMore).toBe(false);
  });
});
```

Что сделать:
1. Создай файл `src/shared/helpers/useInfinity.test.tsx` с содержимым из блока выше, один в один.
2. Больше никаких файлов не трогай и не создавай.

Готово когда:
- файл `src/shared/helpers/useInfinity.test.tsx` существует и содержит ровно этот код.

Действуй так: edit_file src/shared/helpers/useInfinity.test.tsx сразу с указанным содержимым (файл новый, читать перед этим не нужно). Не запускай tsc/npx/eslint/npm test/vitest.

/no_think
