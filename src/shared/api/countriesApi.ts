import { CountryType } from '@/entities/types';
import { instance } from './baseApi';
import { useQuery } from '@tanstack/react-query';

const countriesApi = {
  getCountries() {
    return instance.get<Array<CountryType>>(`${'all'}`);
  },
  getCountryByCode(code: string) {
    return instance.get<Array<CountryType>>(`alpha/${code}`);
  },
};

const useGetCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: async () =>
      await countriesApi.getCountries().then((res) => {
        return res.data;
      }),
  });
};

const useGetCountry = (code: string) => {
  return useQuery({
    queryKey: ['country', code],
    queryFn: async () => (await countriesApi.getCountryByCode(code)).data[0],
    enabled: !!code,
  });
};

export { countriesApi, useGetCountries, useGetCountry };