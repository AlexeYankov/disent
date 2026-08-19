# Disent

Браузер стран на данных [REST Countries API](https://restcountries.com/) (v3.1): список с бесконечной подгрузкой и страница страны с площадью, населением, столицей и регионом.

## Стек

- Next.js 14 (App Router), React 18, TypeScript (`strict`)
- Chakra UI 2, SCSS-модули
- TanStack React Query 5 (данные), Zustand (только UI-состояние)
- Vitest + React Testing Library

## Установка и запуск

Проект использует **pnpm** как единственный package manager (см. `packageManager` в `package.json`).

```bash
pnpm install
cp .env.example .env.local   # заполнить переменные окружения
pnpm dev                     # http://localhost:3000
```

## Команды

| Команда | Назначение |
|---|---|
| `pnpm dev` | dev-сервер |
| `pnpm build` | production-сборка |
| `pnpm start` | запуск production-сборки |
| `pnpm lint` | ESLint |
| `pnpm test` | прогон тестов один раз |
| `pnpm test:watch` | тесты в watch-режиме |
| `npx tsc --noEmit` | проверка типов |

## Переменные окружения

См. `.env.example`.

| Переменная | Назначение |
|---|---|
| `NEXT_PUBLIC_BASE_API_URL` | базовый URL REST Countries API (`https://restcountries.com/v3.1/`). Публичная (`NEXT_PUBLIC_*`), т.к. запросы идут и с клиента, отдельных серверных секретов у проекта нет. |

## Структура и поток данных

```
src/
├── app/              # Next.js роуты (тонкие обёртки над clientPages)
├── clientPages/       # 'use client'-реализации страниц
├── entities/          # типы домена, Zustand-сторы (только UI-состояние)
└── shared/
    ├── api/            # axios-инстанс + React Query хуки (useGetCountries, useGetCountry)
    ├── helpers/        # кастомные хуки (useLoad, useInfinity)
    ├── layouts/        # обёртка root layout
    ├── provider/       # Chakra + QueryClient + toast-провайдер
    └── ui/              # переиспользуемые UI-компоненты
```

- Список стран (`/`) SSR-префетчится в `app/layout.tsx` через `dehydrate(queryClient)` и гидрируется на клиенте тем же query key (`useGetCountries`) — единственный источник данных о списке стран.
- Догрузка карточек — `useInfinity`: клиентская нарезка уже загрученного списка по 20 штук через `IntersectionObserver` (с fallback-кнопкой «Загрузить ещё»), без повторных сетевых запросов.
- Страница страны (`/[name]`, где `name` — код `cca3`) запрашивает данные напрямую через `useGetCountry(cca3)`, не завися от того, была ли открыта главная страница. Отсутствующая страна или ошибка API уводят на `notFound()` (`app/not-found.tsx`).
- Zustand (`entities/app-store.ts`) хранит только UI-флаги (глобальный loader), не серверные данные.
