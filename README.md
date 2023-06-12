# Romsem-pizza-store 

### Готовое приложение для сети пиццерий!

### Основные особенности

1. Использование CMS `Strapi`
2. Генерация документации `Swagger`.
3. Регистрация + Авторизация with `JWT`.
4. Профиль пользователя.
5. Настройки пользователя (Смена имени и пароля пользователя).
6. Избранное для пользователя.
7. Страница заказов пользователя.
8. Slug для страниц.
9. Разработаны гибкие компоненты для товаров.
10. Детальная страница товаров с системой отзывов.
11. Разработаны переиспользуемые компоненты.
12. Оформление заказа в корзине.
14. Гибкий Pinia store для управления состояния приложения.
15. Поиск по товарам.
16. Типизация состояния.

### Развертывание / Deploy

Для запуска приложения необходимо перейти в папки `client` и `server` и установить зависимости.

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Для Frontend

### Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

### Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

```
npm run develop
# or
yarn develop
```

## Для Backend

### `start`

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-build)

```
npm run build
# or
yarn build
```


