# Архітектура додатку User Dashboard

## Управління станом

Додаток використовує **Redux Toolkit** для управління глобальним станом.

### Структура Store

```typescript
{
  auth: {
    user: User | null,
    isAuthenticated: boolean,
    isLoading: boolean,
    error: string | null
  },
  users: {
    users: User[],
    isLoading: boolean,
    error: string | null,
    total: number
  }
}
```

### Slices

#### 1. authSlice (`src/features/auth/authSlice.ts`)

Керує станом аутентифікації користувача:

- **Дії:**
  - `loginStart` - початок процесу логіну
  - `loginSuccess` - успішна аутентифікація (зберігає дані користувача)
  - `loginFailure` - помилка аутентифікації
  - `logout` - вихід із системи

#### 2. usersSlice (`src/features/users/usersSlice.ts`)

Керує списком користувачів:

- **Дії:**
  - `fetchUsersStart` - початок завантаження користувачів
  - `fetchUsersSuccess` - успішне завантаження (зберігає список користувачів)
  - `fetchUsersFailure` - помилка завантаження

## Кастомні хуки

### 1. useAuth (`src/features/auth/useAuth.ts`)

Хук для роботи з аутентифікацією.

**Функціональність:**

- Виконання запиту на логін через API
- Оновлення стану аутентифікації в Redux
- Збереження токена в localStorage
- Автоматичний редірект на Dashboard при успішному вході
- Обробка помилок

**Використання:**

```typescript
const { user, isAuthenticated, isLoading, error, login } = useAuth();

await login({ username: "emilys", password: "emilyspass" });
```

**Значення, що повертаються:**

- `user` - дані поточного користувача
- `isAuthenticated` - статус аутентифікації
- `isLoading` - індикатор завантаження
- `error` - повідомлення про помилку
- `login(credentials)` - функція для виконання логіну

### 2. useFetchUsers (`src/features/users/useFetchUsers.ts`)

Хук для отримання списку користувачів з REST API.

**Функціональність:**

- Автоматичне завантаження користувачів при першому рендері
- Кешування даних у Redux store
- Підтримка пагінації (limit, skip)
- Обробка станів завантаження та помилок
- Можливість примусового оновлення даних

**Використання:**

```typescript
const { users, isLoading, error, total, refetch } = useFetchUsers(30, 0);
```

**Параметри:**

- `limit` (опціонально, за замовчуванням 30) - кількість користувачів
- `skip` (опціонально, за замовчуванням 0) - зміщення для пагінації

**Значення, що повертаються:**

- `users` - масив користувачів
- `isLoading` - індикатор завантаження
- `error` - повідомлення про помилку
- `total` - загальна кількість користувачів
- `refetch()` - функція для повторного завантаження

## API сервіси

### api.ts (`src/services/api.ts`)

Централізована конфігурація для роботи з API dummyjson.com.

**Ендпоінти:**

1. **authAPI.login(credentials)** - аутентифікація користувача
   - POST `https://dummyjson.com/auth/login`
   - Повертає дані користувача та токени

2. **usersAPI.getUsers(limit, skip)** - отримання списку користувачів
   - GET `https://dummyjson.com/users?limit={limit}&skip={skip}`
   - Повертає список користувачів та метадані

## Структура компонентів

```
src/
├── app/
│   ├── store.ts         # Конфігурація Redux store
│   └── hooks.ts         # Типізовані хуки useAppDispatch та useAppSelector
├── features/
│   ├── auth/
│   │   ├── authSlice.ts # Redux slice для аутентифікації
│   │   ├── types.ts     # TypeScript типи
│   │   └── useAuth.ts   # Кастомний хук для аутентифікації
│   └── users/
│       ├── usersSlice.ts    # Redux slice для користувачів
│       ├── type.ts          # TypeScript типи
│       └── useFetchUsers.ts # Кастомний хук для завантаження користувачів
├── pages/
│   ├── Login/           # Сторінка входу
│   └── Dashboard/       # Головна сторінка з користувачами
├── router/
│   └── AppRouter.tsx    # Маршрутизація додатку
└── services/
    └── api.ts           # API клієнт та ендпоінти
```

## Потік даних

### Аутентифікація:

1. Користувач вводить дані у форму Login
2. Викликається `login()` з хука `useAuth`
3. Відправляється POST запит на `/auth/login`
4. При успіху: дані зберігаються в Redux store (authSlice) та localStorage
5. Відбувається редірект на `/dashboard`

### Завантаження користувачів:

1. При монтуванні Dashboard викликається `useFetchUsers`
2. Перевіряється наявність даних у store
3. Якщо даних немає - відправляється GET запит на `/users`
4. Отримані дані зберігаються в Redux store (usersSlice)
5. Компонент відображає список користувачів

## Технології

- **React 18** - UI бібліотека
- **TypeScript** - типізація
- **Redux Toolkit** - управління станом
- **React Router** - маршрутизація
- **Axios** - HTTP клієнт
- **SCSS Modules** - стилізація
- **Vite** - збірник
