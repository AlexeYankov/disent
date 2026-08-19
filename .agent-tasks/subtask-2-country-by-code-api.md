Добавь в `src/shared/api/countriesApi.ts` запрос одной страны по коду cca3.

Текущее содержимое файла:
```ts
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
```

Что сделать:
1. В объект `countriesApi` добавь метод `getCountryByCode(code: string)`, который делает `instance.get<Array<CountryType>>(\`alpha/\${code}\`)` (REST Countries API возвращает массив из одного элемента для этого эндпоинта).
2. Добавь хук `useGetCountry(code: string)`:
   - `useQuery({ queryKey: ['country', code], queryFn: async () => (await countriesApi.getCountryByCode(code)).data[0], enabled: !!code })`.
3. Экспортируй `useGetCountry` наравне с `useGetCountries` и `countriesApi`.
4. Не удаляй и не меняй существующие `getCountries` и `useGetCountries`.
5. Не трогай другие файлы.

Готово когда:
- в файле есть `getCountryByCode` и `useGetCountry`, оба экспортированы.
- существующий код `getCountries`/`useGetCountries` не изменён по поведению.

Действуй так: read_file src/shared/api/countriesApi.ts → edit_file с полным новым содержимым файла. Не запускай tsc/npx/eslint/npm test.

/no_think
