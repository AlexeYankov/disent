Перепиши `src/shared/helpers/useInfinity.tsx`, заменив содержимое ПОЛНОСТЬЮ на следующий код:

```tsx
import React from 'react';
import { CountryType } from '@/entities/types';

const PAGE_SIZE = 20;

export function useInifinity(items: CountryType[]) {
  const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE);
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [items]);

  React.useEffect(() => {
    const node = sentinelRef.current;
    if (!node) {
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries[0] && entries[0].isIntersecting) {
        setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, items.length));
      }
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [items.length]);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;
  const loadMore = () =>
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, items.length));

  return { visibleItems, sentinelRef, hasMore, loadMore };
}
```

Что сделать:
1. Открой `src/shared/helpers/useInfinity.tsx`.
2. Замени его содержимое ПОЛНОСТЬЮ на код из блока выше, один в один.
3. Больше никаких файлов не трогай.

Готово когда:
- файл `src/shared/helpers/useInfinity.tsx` содержит ровно этот код.

Действуй так: read_file src/shared/helpers/useInfinity.tsx → edit_file с указанным выше содержимым. Не запускай tsc/npx/eslint/npm test.

/no_think
