Перепиши `src/entities/types.ts`, заменив содержимое ПОЛНОСТЬЮ на следующий код:

```ts
export interface CountryType {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  cca3: string;
  ccn3?: string;
  capital?: string[];
  region?: string;
  area?: number;
  population?: number;
  status?: string;
  flags?: {
    png?: string;
    svg?: string;
    alt?: string;
  };
}
```

Что сделать:
1. Открой `src/entities/types.ts`.
2. Замени его содержимое ПОЛНОСТЬЮ на код из блока выше, один в один.
3. Больше никаких файлов не трогай. Не трогай `src/entities/country.json` (просто перестань его импортировать в этом файле).

Готово когда:
- файл `src/entities/types.ts` содержит ровно этот код (без импорта country.json).

Действуй так: read_file src/entities/types.ts → edit_file с указанным выше содержимым. Не запускай tsc/npx/eslint/npm test.

/no_think
