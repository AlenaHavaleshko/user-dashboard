# Архитектура приложения User Dashboard

## Управление состоянием

Приложение использует **Redux Toolkit** для управления глобальным состоянием.

### Store структура

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

Управляет состоянием аутентификации пользователя:

- **Действия:**
  - `loginStart` - начало процесса логина
  - `loginSuccess` - успешная аутентификация (сохраняет данные пользователя)
  - `loginFailure` - ошибка аутентификации
  - `logout` - выход из системы

#### 2. usersSlice (`src/features/users/usersSlice.ts`)

Управляет списком пользователей:

- **Действия:**
  - `fetchUsersStart` - начало загрузки пользователей
  - `fetchUsersSuccess` - успешная загрузка (сохраняет список пользователей)
  - `fetchUsersFailure` - ошибка загрузки

## Кастомные хуки

### 1. useAuth (`src/features/auth/useAuth.ts`)

Хук для работы с аутентификацией.

**Функциональность:**

- Выполнение запроса на логин через API
- Обновление состояния аутентификации в Redux
- Сохранение токена в localStorage
- Автоматический редирект на Dashboard при успешном входе
- Обработка ошибок

**Использование:**

```typescript
const { user, isAuthenticated, isLoading, error, login } = useAuth();

await login({ username: "emilys", password: "emilyspass" });
```

**Возвращаемые значения:**

- `user` - данные текущего пользователя
- `isAuthenticated` - статус аутентификации
- `isLoading` - индикатор загрузки
- `error` - сообщение об ошибке
- `login(credentials)` - функция для выполнения логина

### 2. useFetchUsers (`src/features/users/useFetchUsers.ts`)

Хук для получения списка пользователей с REST API.

**Функциональность:**

- Автоматическая загрузка пользователей при первом рендере
- Кэширование данных в Redux store
- Поддержка пагинации (limit, skip)
- Обработка состояний загрузки и ошибок
- Возможность принудительного обновления данных

**Использование:**

```typescript
const { users, isLoading, error, total, refetch } = useFetchUsers(30, 0);
```

**Параметры:**

- `limit` (опционально, по умолчанию 30) - количество пользователей
- `skip` (опционально, по умолчанию 0) - смещение для пагинации

**Возвращаемые значения:**

- `users` - массив пользователей
- `isLoading` - индикатор загрузки
- `error` - сообщение об ошибке
- `total` - общее количество пользователей
- `refetch()` - функция для повторной загрузки

## API сервисы

### api.ts (`src/services/api.ts`)

Централизованная конфигурация для работы с API dummyjson.com.

**Эндпоинты:**

1. **authAPI.login(credentials)** - аутентификация пользователя
   - POST `https://dummyjson.com/auth/login`
   - Возвращает данные пользователя и токены

2. **usersAPI.getUsers(limit, skip)** - получение списка пользователей
   - GET `https://dummyjson.com/users?limit={limit}&skip={skip}`
   - Возвращает список пользователей и метаданные

## Структура компонентов

```
src/
├── app/
│   ├── store.ts         # Конфигурация Redux store
│   └── hooks.ts         # Типизированные хуки useAppDispatch и useAppSelector
├── features/
│   ├── auth/
│   │   ├── authSlice.ts # Redux slice для аутентификации
│   │   ├── types.ts     # TypeScript типы
│   │   └── useAuth.ts   # Кастомный хук для аутентификации
│   └── users/
│       ├── usersSlice.ts    # Redux slice для пользователей
│       ├── type.ts          # TypeScript типы
│       └── useFetchUsers.ts # Кастомный хук для загрузки пользователей
├── pages/
│   ├── Login/           # Страница входа
│   └── Dashboard/       # Главная страница с пользователями
├── router/
│   └── AppRouter.tsx    # Маршрутизация приложения
└── services/
    └── api.ts           # API клиент и эндпоинты
```

## Поток данных

### Аутентификация:

1. Пользователь вводит данные в форму Login
2. Вызывается `login()` из хука `useAuth`
3. Отправляется POST запрос на `/auth/login`
4. При успехе: данные сохраняются в Redux store (authSlice) и localStorage
5. Происходит редирект на `/dashboard`

### Загрузка пользователей:

1. При монтировании Dashboard вызывается `useFetchUsers`
2. Проверяется наличие данных в store
3. Если данных нет - отправляется GET запрос на `/users`
4. Полученные данные сохраняются в Redux store (usersSlice)
5. Компонент отображает список пользователей

## Технологии

- **React 18** - UI библиотека
- **TypeScript** - типизация
- **Redux Toolkit** - управление состоянием
- **React Router** - маршрутизация
- **Axios** - HTTP клиент
- **SCSS Modules** - стилизация
- **Vite** - сборщик
