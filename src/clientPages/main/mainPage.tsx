'use client';

import React from 'react';
import { Button, Center, Text } from '@chakra-ui/react';
import { useGetCountries } from '@/shared/api/countriesApi';
import { useLoad } from '@/shared/helpers/useLoad';
import { Container } from '@/shared/ui/container';
import { CardKit } from '@/shared/ui/card';
import { CountryType } from '@/entities/types';
import { toastWrapper } from '@/shared/ui/toast/toastWrapper';
import { useInfinity } from '@/shared/helpers/useInfinity';
import { RemoveScroll } from 'react-remove-scroll';
import s from './mainPage.module.scss';
import Link from 'next/link';
import Loader from '@/shared/ui/loader';

const MainClientPage = () => {
  useLoad();
  const [lock, setLock] = React.useState(false);
  const { error, data, refetch, isFetching } = useGetCountries();

  const { visibleItems, sentinelRef, hasMore, loadMore } = useInfinity(
    data ?? []
  );

  React.useEffect(() => {
    if (error?.message) {
      toastWrapper(error.message, true);
    }
  }, [error]);

  if (error?.message) {
    return (
      <Center flexDirection={'column'} p="7" marginTop="40px" gap={'20px'}>
        <Text fontSize="2xl">Не удалось загрузить список стран</Text>
        <Button onClick={() => refetch()} isLoading={isFetching}>
          Повторить
        </Button>
      </Center>
    );
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
            const capital = el.capital?.join(', ');
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