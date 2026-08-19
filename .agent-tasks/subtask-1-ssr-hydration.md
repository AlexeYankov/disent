Исправь SSR-гидрацию React Query.

Файл `src/app/layout.tsx`:
- сейчас `queryClient.prefetchQuery({ queryKey: ['countries'], ... })` выполняется, но в `<Providers dehydratedState={{} as DehydratedState} ...>` передаётся пустой объект вместо реального dehydrated state — префетч результата не используется.
- замени `{{} as DehydratedState}` на `dehydrate(queryClient)` (импортируй `dehydrate` из `@tanstack/react-query`).

Файл `src/shared/api/countriesApi.ts` (или общий модуль query keys, если есть) — используй queryKey `['countries']` без изменений: клиентский хук `useGetCountries` уже использует такой же ключ, не меняй его.

Ограничения:
- не меняй логику Zustand-сторов, не трогай другие файлы кроме `src/app/layout.tsx`.
- не меняй сигнатуру `Providers`.
- не добавляй новые зависимости.

Готово когда:
- `dehydrate(queryClient)` передаётся в `Providers`.

Действуй так: read_file src/app/layout.tsx → edit_file с полным новым содержимым файла. Не запускай tsc/npx/eslint — их нет в этом окружении, они всегда будут заблокированы, не пытайся их вызывать.
