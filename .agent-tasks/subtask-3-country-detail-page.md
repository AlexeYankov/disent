Перепиши `src/clientPages/countryPage/countryPage.tsx`, заменив содержимое ПОЛНОСТЬЮ на следующий код:

```tsx
'use client';

import { useGetCountry } from '@/shared/api/countriesApi';
import { Container } from '@/shared/ui/container';
import { CardKit } from '@/shared/ui/card';
import { Center, Text } from '@chakra-ui/react';
import s from './countryPage.module.scss';
import Loader from '@/shared/ui/loader';
import { notFound } from 'next/navigation';

type CountryClientPageType = {
  countryName: string;
};

function numberWithSpaces(x: number) {
  return x.toLocaleString('ru-RU');
}

const CountryClientPage = (prop: CountryClientPageType) => {
  const {
    data: countrieInfo,
    isLoading,
    isError,
  } = useGetCountry(prop.countryName);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !countrieInfo) {
    notFound();
  }

  const capital = Array.isArray(countrieInfo.capital)
    ? countrieInfo.capital.join(', ')
    : countrieInfo.capital;

  return (
    <Container>
      <div className={s.pageContainer}>
        <CardKit>
          <Center maxW={{ base: '300px', sm: '100%' }}>
            <Text
              fontSize="2xl"
              textAlign={'center'}
              overflow={'hidden'}
              whiteSpace={'nowrap'}
              textOverflow={'ellipsis'}
              px="2"
            >
              {countrieInfo.name.common}
            </Text>
          </Center>
          <div className={s.countryDescription}>
            <div
              className={s.countryImage}
              style={{
                backgroundImage: `url(${countrieInfo.flags.png})`,
              }}
            />
            <div className={s.countryCapital}>
              <span>Столица</span>
              <span>{capital || '—'}</span>
            </div>
            <div className={s.countryCapital}>
              <span>Площадь</span>
              <span>
                {countrieInfo.area
                  ? `${numberWithSpaces(countrieInfo.area)} кв.км.`
                  : '—'}
              </span>
            </div>
            <div className={s.countryCapital}>
              <span>Население</span>
              <span>
                {countrieInfo.population
                  ? `${numberWithSpaces(
                      Math.round(countrieInfo.population / 1000)
                    )} тыс. чел.`
                  : '—'}
              </span>
            </div>

            <div className={s.countryCapital}>
              <span>Признано</span>
              <span>{countrieInfo.status || '—'}</span>
            </div>

            <div className={s.countryCapital}>
              <span>Регион</span>
              <span>{countrieInfo.region || '—'}</span>
            </div>
          </div>
        </CardKit>
      </div>
    </Container>
  );
};

export default CountryClientPage;
```

Что сделать:
1. Открой `src/clientPages/countryPage/countryPage.tsx`.
2. Замени его содержимое ПОЛНОСТЬЮ на код из блока выше, один в один.
3. Больше никаких файлов не трогай.

Готово когда:
- файл `src/clientPages/countryPage/countryPage.tsx` содержит ровно этот код.

Действуй так: read_file src/clientPages/countryPage/countryPage.tsx → edit_file с указанным выше содержимым. Не запускай tsc/npx/eslint/npm test.

/no_think
