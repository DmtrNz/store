# Backend для интернет-магазина

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Запуск в продакшене
npm start

# Настройка базы данных
npm run setup:db
```

## Линтинг

Проект использует ESLint для проверки качества кода.

```bash
# Проверка кода
npm run lint

# Автоматическое исправление ошибок
npm run lint:fix
```

### Конфигурация ESLint

- Использует стандартную конфигурацию `eslint-config-standard`
- Правила для Node.js и ES2021
- Поддержка Jest для тестирования
- Исключает папки `node_modules/`, `coverage/`, `tests/`

## Тестирование

Проект использует Jest и Supertest для тестирования.

```bash
# Запуск всех тестов
npm test

# Запуск тестов в режиме watch
npm run test:watch

# Запуск тестов с покрытием кода
npm run test:coverage
```

### Структура тестов

- `tests/api.test.js` - тесты API endpoints с моками
- `tests/integration.test.js` - интеграционные тесты API
- `tests/utils.test.js` - тесты утилитарных функций
- `tests/setup.js` - настройка тестового окружения

### Покрытие кода

После запуска `npm run test:coverage` создается папка `coverage/` с подробным отчетом о покрытии кода тестами.

## Структура проекта

```
backend/
├── db/                 # База данных
│   └── database.js     # Подключение к PostgreSQL
├── routes/             # API маршруты
│   └── products.js     # Маршруты для товаров
├── utils/              # Утилиты
│   └── validation.js   # Функции валидации
├── tests/              # Тесты
│   ├── api.test.js
│   ├── integration.test.js
│   ├── utils.test.js
│   └── setup.js
├── scripts/            # Скрипты
│   └── setup-database.js
├── server.js           # Основной файл сервера
├── package.json        # Зависимости и скрипты
├── .eslintrc.js        # Конфигурация ESLint
├── jest.config.js      # Конфигурация Jest
└── .eslintignore       # Исключения для ESLint
```

## API Endpoints

### Health Check
- `GET /api/health` - проверка состояния сервера

### Products
- `GET /api/products` - список товаров с пагинацией
- `GET /api/products/:id` - товар по ID
- `GET /api/products/search/:query` - поиск товаров

## Переменные окружения

Создайте файл `config.env` в корне backend:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce
DB_USER=postgres
DB_PASSWORD=password
PORT=3001
```

## Разработка

### Добавление новых тестов

1. Создайте файл с расширением `.test.js` в папке `tests/`
2. Используйте Jest для написания тестов
3. Для тестирования API используйте Supertest

### Пример теста

```javascript
const request = require('supertest');
const app = require('../server');

describe('API Test', () => {
  it('должен вернуть статус 200', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);
    
    expect(response.body.status).toBe('OK');
  });
});
```

### Добавление новых утилит

1. Создайте функции в `utils/validation.js`
2. Напишите тесты в `tests/utils.test.js`
3. Экспортируйте функции через `module.exports` 