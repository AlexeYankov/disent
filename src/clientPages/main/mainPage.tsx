'use client';

import React from 'react';
import NotFound from '../notFound/notFound';
import { Text } from '@chakra-ui/react';
import { useGetCountries } from '@/shared/api/countriesApi';
import { useLoad } from '@/shared/helpers/useLoad';
import { Container } from '@/shared/ui/container';
import { CardKit } from '@/shared/ui/card';
import { CountryType } from '@/entities/types';
import { toastWrapper } from '@/shared/ui/toast/toastWrapper';
import { useCountriesStore } from '@/entities/countri-store';
import { useInifinity } from '@/shared/helpers/useInfinity';
import s from './mainPage.module.scss';
import Link from 'next/link';
import Loader from '@/shared/ui/loader';

const MainClientPage = () => {
  useLoad();
  const { error, data } = useGetCountries();
  const { countriesInView, setCountriesInView, setCountries } =
    useCountriesStore();
  React.useEffect(() => {
    if (data?.length) {
      setCountries(data);
      setCountriesInView(data.slice(0, 20));
    }
  }, [data]);

  useInifinity();

  React.useEffect(() => {
    if (error?.message) {
      toastWrapper(error.message, true);
    }
  }, [error]);

  if (error?.message) {
    return <NotFound />;
  }

  return (
    <Container>
      <Text textAlign={'center'} minW={'350px'} fontSize={{base: "xl", sm: '3xl'}} pt="40px">
        simple Disent test App
      </Text>

      <div className={s.mainContainer}>
        {!countriesInView.length && <Loader />}
        {countriesInView?.map((el: CountryType, i) => {
          const routeTo = el.cca2 + el.cca3 + el.ccn3;
          return (
            <Link href={routeTo} key={i}>
              <CardKit label={el.name.common}>
                <div className={s.countryDescription}>
                  <div
                    className={s.countryImage}
                    style={{
                      backgroundImage: `url(${el.flags.png})`,
                    }}
                  />
                  <div className={s.countryCapital}>
                    <span>Столица</span>
                    <span>{el.capital}</span>
                  </div>
                </div>
              </CardKit>
            </Link>
          );
        })}
      </div>
      <input id="anchor" className={s.hiddenInput} type="text" />
    </Container>
  );
};

export default MainClientPage;
