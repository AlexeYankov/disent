'use client';

import React from 'react';
import NotFound from '../notFound/notFound';
import { useGetCountries } from '@/shared/api/countriesApi';
import { useLoad } from '@/shared/helpers/useLoad';
import { Container } from '@/shared/ui/container';
import { CardKit } from '@/shared/ui/card';
import { CountryType } from '@/entities/types';
import { toastWrapper } from '@/shared/ui/toast/toastWrapper';
import { useCountriesStore } from '@/entities/countri-store';
import { useInifinity } from '@/shared/helpers/useInfinity';
import s from './mainPage.module.scss';

const MainClientPage = () => {
  useLoad();
  useInifinity();
  const { error, data } = useGetCountries();
  const { countriesInView, setCountriesInView, setCountries } =
    useCountriesStore();

  React.useEffect(() => {
    if (error?.message) {
      toastWrapper(error.message, true);
    }
  }, [error]);

  if (error?.message) {
    return <NotFound />;
  }

  React.useEffect(() => {
    if (data?.length) {
      setCountries(data);
      setCountriesInView(data.slice(0, 20));
    }
  }, [data]);
  return (
    <Container>
      <div className="">
        {countriesInView?.map((el: CountryType, i) => {
          return (
            <CardKit key={i}>
              <div>{el.name.common}</div>
            </CardKit>
          );
        })}
      </div>
      <input id="anchor" className={s.hiddenInput} type="text" />
    </Container>
  );
};

export default MainClientPage;
