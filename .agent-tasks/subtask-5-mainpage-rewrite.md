Перепиши `src/clientPages/main/mainPage.tsx`, заменив содержимое ПОЛНОСТЬЮ на следующий код:

```tsx
'use client';

import React from 'react';
import NotFound from '../notFound/notFound';
import { Button, Text } from '@chakra-ui/react';
import { useGetCountries } from '@/shared/api/countriesApi';
import { useLoad } from '@/shared/helpers/useLoad';
import { Container } from '@/shared/ui/container';
import { CardKit } from '@/shared/ui/card';
import { CountryType } from '@/entities/types';
import { toastWrapper } from '@/shared/ui/toast/toastWrapper';
import { useInifinity } from '@/shared/helpers/useInfinity';
import { RemoveScroll } from 'react-remove-scroll';
import s from './mainPage.module.scss';
import Link from 'next/link';
import Loader from '@/shared/ui/loader';

const MainClientPage = () => {
  useLoad();
  const [lock, setLock] = React.useState(false);
  const { error, data } = useGetCountries();

  const { visibleItems, sentinelRef, hasMore, loadMore } = useInifinity(
    data ?? []
  );

  React.useEffect(() => {
    if (error?.message) {
      toastWrapper(error.message, true);
    }
  }, [error]);

  if (error?.message) {
    return <NotFound />;
  }

  return (
    <RemoveScroll enabled={lock}>
      <Container>
        <Text textAlign={'center'} fontSize={{ base: 'xl', sm: '3xl' }} py="30px">
          simple Disent test App
        </Text>

        <div className={s.mainContainer}>
          {!visibleItems.length && <Loader />}
          {visibleItems.map((el: CountryType) => {
            const routeTo = el.cca3;
            const capital = Array.isArray(el.capital)
              ? el.capital.join(', ')
              : el.capital;
            return (
              <Link href={routeTo} key={el.cca3}>
                <CardKit label={el.name.common}>
                  <div className={s.countryDescription}>
                    <div
                      className={s.countryImage}
                      style={{
                        backgroundImage: el.flags?.png
                          ? `url(${el.flags.png})`
                          : undefined,
                      }}
                    />
                    <div className={s.countryCapital}>
                      <span>Столица</span>
                      <span>{capital || '—'}</span>
                    </div>
                  </div>
                </CardKit>
              </Link>
            );
          })}
        </div>
        <div ref={sentinelRef} />
        {hasMore && (
          <Button onClick={loadMore} display="block" mx="auto" my="20px">
            Загрузить ещё
          </Button>
        )}
      </Container>
    </RemoveScroll>
  );
};

export default MainClientPage;
```

Что сделать:
1. Открой `src/clientPages/main/mainPage.tsx`.
2. Замени его содержимое ПОЛНОСТЬЮ на код из блока выше, один в один.
3. Больше никаких файлов не трогай (в частности не трогай `src/entities/countri-store.ts` — он больше не используется, но удалять его сейчас не нужно).

Готово когда:
- файл `src/clientPages/main/mainPage.tsx` содержит ровно этот код.

Действуй так: read_file src/clientPages/main/mainPage.tsx → edit_file с указанным выше содержимым. Не запускай tsc/npx/eslint/npm test.

/no_think
