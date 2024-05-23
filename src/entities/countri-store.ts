import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CountryType } from './types';

export type CountriesStateType = {
  countries: Array<CountryType>;
  countriesInView: Array<CountryType>;
};

export type CountriesActions = {
  setCountries: (value: Array<CountryType>) => void;
  setCountriesInView: (value: Array<CountryType>) => void;
};

// export type CounterStore = CounterState & CounterActions;
export type CountriesStore = CountriesActions & CountriesStateType;
export const initCountriesStore = (): CountriesStateType => {
  return { countries: [] as Array<CountryType>, countriesInView: [] as Array<CountryType>};
};
export const useCountriesStore = create<CountriesStore>()(
  persist(
    (set, get) => ({
      countries: [] as Array<CountryType>,
      countriesInView: [] as Array<CountryType>,
      setCountries: (value: Array<CountryType>) => {
        return set({ countries: value });
      },
      setCountriesInView: (value: Array<CountryType>) => {
        return set({ countriesInView: [...value] });
      },
    }),
    {
      name: 'countries-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      //   skipHydration: true,
    }
  )
);
