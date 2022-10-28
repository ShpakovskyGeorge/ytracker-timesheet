# Yandex Tracker Timesheet

## Возможности

- Просмотр трудозатрат в табличном виде по пользователям в организации
- Общее время по задачам/дням + общее время за период
- Фильтрация по периодам
- Группировка по проектам
- Светлая/темная тема

## Локальный запуск

Устанавливаем зависимости
```
yarn install
```

В корневой директории создать файл .env и заполнить его по формату  
Более подробно [здесь](https://cloud.yandex.ru/docs/tracker/concepts/access)
```
YANDEX_TRACKER_TOKEN=OAuth y0_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
YANDEX_TRACKER_ORGID=1234567
```

Запускаем дев-сервер
```
yarn dev
```

Сервер локально разворачивается на [http://localhost:3000](http://localhost:3000).


## Сборка и деплой

1. устанавливаем зависимости (`yarn` \/ `yarn install`)
2. собираем сервер (`yarn build`)
3. в папку `.next/standalone` копируем папку `public`
4. в папку `.next/standalone/.next` копируем папку `.next/static`
5. переносим файлы папки `.next/standalone` в место из которого сервер будет запускаться
6. из того места запускаем сервер `node server.js`
