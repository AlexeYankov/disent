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
import { url } from 'inspector';

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
      setCountriesInView(data.slice(0, 21));
    }
  }, [data]);

  return (
    <Container>
      <Text fontSize="3xl" pt="40px">
        simple Disent test App
      </Text>
      <div className={s.mainContainer}>
        {countriesInView?.map((el: CountryType, i) => {
          return (
            <CardKit key={i} label={el.name.common}>
              <div className={s.countryDescription}>
                <div
                  className={s.countryImage}
                  style={{
                    backgroundImage: `url(${el.flags.png})`,
                  }}
                />
                <div>
                  <span>Столица</span>
                  <span>{el.capital}</span>
                </div>
                {/* <div>
                  <span>Население</span>
                  <span>{Math.round(el.population / 1000)} тыс.</span>
                </div>
                <div>
                  <span>Признана в мире</span>
                  <span>{el.status}</span>
                </div> */}
              </div>
            </CardKit>
          );
        })}
      </div>
      <input id="anchor" className={s.hiddenInput} type="text" />
    </Container>
  );
};

export default MainClientPage;
