'use client';

import { useCountriesStore } from '@/entities/countri-store';
import { Container } from '@/shared/ui/container';
import { CardKit } from '@/shared/ui/card';
import { Center, Text } from '@chakra-ui/react';
import s from './countryPage.module.scss';
import Loader from '@/shared/ui/loader';

type CountryClientPageType = {
  countryName: string;
};

const CountryClientPage = (prop: CountryClientPageType) => {
  const { countries } = useCountriesStore();
  const countrieInfo = countries.filter((el) =>
    el.cca2 + el.cca3 + el.ccn3 === prop.countryName ? el : ''
  )[0];

  function numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  if (!countries.length) {
    return <Loader/>
  }

  return (
    <Container>
      <div className={s.pageContainer}>
        <CardKit>
          <Center maxW={{base: '300px', sm: '100%'}}>
            <Text
              fontSize="2xl"
              textAlign={'center'}
              overflow={'hidden'}
              whiteSpace={'nowrap'}
              textOverflow={'ellipsis'}
              px='2'
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
              <span>{countrieInfo.capital}</span>
            </div>
            <div className={s.countryCapital}>
              <span>Площадь</span>
              <span>{numberWithSpaces(countrieInfo.area)} кв.км.</span>
            </div>
            <div className={s.countryCapital}>
              <span>Население</span>
              <span>
                {numberWithSpaces(Math.round(countrieInfo.population / 1000))}{' '}
                тыс. чел.
              </span>
            </div>

            <div className={s.countryCapital}>
              <span>Признано</span>
              <span>{countrieInfo.status}</span>
            </div>

            <div className={s.countryCapital}>
              <span>Регион</span>
              <span>{countrieInfo.region}</span>
            </div>
          </div>
        </CardKit>
      </div>
    </Container>
  );
};

export default CountryClientPage;
