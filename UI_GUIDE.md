# UI и Стилизация - Руководство

## Ant Design Компоненты

Приложение использует **Ant Design** для построения UI. Вот список используемых компонентов:

### Login страница

#### Компоненты:

- **Form** - обертка формы с валидацией
- **Form.Item** - элементы формы с правилами валидации
- **Input** - текстовое поле для username
- **Input.Password** - поле для пароля с возможностью скрытия/показа
- **Button** - кнопка отправки формы с состоянием загрузки
- **Alert** - уведомления об ошибках и подсказках

#### Иконки:

- `UserOutlined` - иконка пользователя
- `LockOutlined` - иконка замка для пароля

#### Особенности:

- Встроенная валидация (required fields)
- Автоматическая обработка состояний (loading, disabled)
- Префиксы с иконками для лучшего UX
- Alert для отображения ошибок

### Dashboard страница

#### Компоненты:

- **Layout** - основная структура страницы
- **Content** - контентная область
- **Card** - карточки для информации о пользователе и таблицы
- **Avatar** - аватар пользователя
- **Table** - таблица со списком пользователей
- **Spin** - индикатор загрузки
- **Alert** - сообщения об ошибках
- **Button** - кнопка Logout

#### Иконки:

- `UserOutlined` - иконка пользователя по умолчанию
- `LogoutOutlined` - иконка выхода

#### Особенности Table:

- **Сортировка** по всем колонкам
- **Пагинация** с выбором размера страницы
- **Responsive** - адаптивные колонки (responsive: ['xs', 'sm'])
- **Scroll** - горизонтальная прокрутка на мобильных устройствах
- Счетчик "Total X users"

## SASS Архитектура

### Структура стилей

```
src/
├── styles/
│   └── variables.scss      # Глобальные переменные и миксины
├── index.scss              # Глобальные стили
└── pages/
    ├── Login/
    │   └── Login.module.scss
    └── Dashboard/
        └── Dashboard.module.scss
```

### Переменные (variables.scss)

#### Цвета

```scss
$primary-color: #1890ff;
$success-color: #52c41a;
$error-color: #ff4d4f;
$warning-color: #faad14;
$text-color: #262626;
$background-color: #f0f2f5;
$white: #ffffff;
```

#### Spacing

```scss
$spacing-xs: 0.5rem;
$spacing-sm: 1rem;
$spacing-md: 1.5rem;
$spacing-lg: 2rem;
$spacing-xl: 3rem;
```

#### Border Radius

```scss
$border-radius-sm: 4px;
$border-radius-md: 8px;
$border-radius-lg: 12px;
```

#### Shadows

```scss
$shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
$shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
```

### Миксины

#### flex-center

```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

#### card

```scss
@mixin card {
  background: $white;
  border-radius: $border-radius-md;
  box-shadow: $shadow-md;
  padding: $spacing-lg;
}
```

#### respond-to (медиазапросы)

```scss
@mixin respond-to($breakpoint) {
  // xs, sm, md, lg, xl
}
```

### Breakpoints (Адаптивность)

```scss
$breakpoint-xs: 480px; // Смартфоны (портрет)
$breakpoint-sm: 576px; // Смартфоны (ландшафт)
$breakpoint-md: 768px; // Планшеты
$breakpoint-lg: 992px; // Небольшие ноутбуки
$breakpoint-xl: 1200px; // Десктопы
$breakpoint-xxl: 1600px; // Большие экраны
```

## Модульный подход

Все компоненты используют **CSS Modules** (\*.module.scss):

### Преимущества:

- Изолированные стили (нет конфликтов имен классов)
- Автоматическая генерация уникальных имен классов
- Возможность использовать глобальные стили через `:global()`

### Пример использования:

```tsx
import styles from "./Component.module.scss";

<div className={styles.container}>
  <h1 className={styles.title}>Title</h1>
</div>;
```

### Доступ к глобальным классам Ant Design:

```scss
.form {
  :global(.ant-form-item) {
    margin-bottom: $spacing-md;
  }
}
```

## Адаптивный дизайн

### Login страница

```scss
.formWrapper {
  max-width: 450px;

  @include respond-to(sm) {
    padding: $spacing-md;
  }
}

.formHeader h1 {
  font-size: 2rem;

  @include respond-to(sm) {
    font-size: 1.5rem;
  }
}
```

### Dashboard страница

```scss
.container {
  padding: $spacing-lg;

  @include respond-to(md) {
    padding: $spacing-md;
  }

  @include respond-to(sm) {
    padding: $spacing-sm;
  }
}

.header {
  @include respond-to(sm) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.userInfo {
  @include respond-to(sm) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
```

### Ant Design Table (responsive)

```tsx
const columns: ColumnsType<User> = [
  {
    title: "First Name",
    dataIndex: "firstName",
    responsive: ["sm"], // Скрывается на xs экранах
  },
  {
    title: "Age",
    dataIndex: "age",
    responsive: ["xs"], // Видно на всех экранах
  },
];

<Table
  scroll={{ x: 400 }} // Горизонтальная прокрутка
/>;
```

## Анимации

### Fade In (Login форма)

```scss
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.formWrapper {
  animation: fadeIn 0.5s ease-in;
}
```

## Кастомизация Ant Design

### Gradient для Card заголовков

```scss
.currentUserCard {
  :global(.ant-card-head) {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: $white;
  }
}
```

### Стилизация Table

```scss
.usersCard {
  :global(.ant-table-thead > tr > th) {
    background: lighten($primary-color, 45%);
    font-weight: 600;
  }

  :global(.ant-table-tbody > tr:hover > td) {
    background: lighten($primary-color, 48%);
  }
}
```

## Проверка адаптивности

### Тестовые разрешения:

- **Mobile**: 375px × 667px (iPhone)
- **Tablet**: 768px × 1024px (iPad)
- **Desktop**: 1920px × 1080px

### Ключевые точки проверки:

✅ Форма логина центрирована на всех экранах  
✅ Кнопки имеют достаточный размер для тач-экранов (44px)  
✅ Таблица прокручивается горизонтально на мобильных  
✅ Карточка пользователя переключается в колонку на планшетах  
✅ Текст масштабируется соответственно размеру экрана  
✅ Header Dashboard стекается в колонку на мобильных

## Лучшие практики

1. **Всегда используйте переменные** вместо хардкода значений
2. **Используйте миксины** для повторяющихся паттернов
3. **Вложенность SASS** - не более 3-4 уровней
4. **Mobile-first** подход при создании стилей
5. **Семантические классы** - `.userInfo` вместо `.flex-box-1`
6. **Изолируйте стили** через CSS Modules
7. **Переиспользуйте** компоненты Ant Design вместо создания своих

## Иконки

Используется `@ant-design/icons`:

```tsx
import { UserOutlined, LockOutlined, LogoutOutlined } from "@ant-design/icons";
```

Полный список иконок: https://ant.design/components/icon
