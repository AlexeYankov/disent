import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { useInfinity } from './useInfinity';
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

describe('useInfinity', () => {
  it('shows first page of items', () => {
    const items = makeItems(50);
    const { result } = renderHook(() => useInfinity(items));
    expect(result.current.visibleItems).toHaveLength(20);
    expect(result.current.hasMore).toBe(true);
  });

  it('loads more items via loadMore', () => {
    const items = makeItems(50);
    const { result } = renderHook(() => useInfinity(items));
    act(() => {
      result.current.loadMore();
    });
    expect(result.current.visibleItems).toHaveLength(40);
  });

  it('reports no more items once all are visible', () => {
    const items = makeItems(10);
    const { result } = renderHook(() => useInfinity(items));
    expect(result.current.visibleItems).toHaveLength(10);
    expect(result.current.hasMore).toBe(false);
  });
});