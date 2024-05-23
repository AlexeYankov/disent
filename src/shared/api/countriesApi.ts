import { CountryType } from '@/entities/types';
import { instance } from './baseApi';
import { useQuery } from '@tanstack/react-query';

const countriesApi = {
  getCountries() {
    return instance.get<Array<CountryType>>(`${'all'}`);
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

export { countriesApi, useGetCountries };
