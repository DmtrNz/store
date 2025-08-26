# Тестирование Backend

## Запуск тестов

```bash
# Запустить все тесты
npm test

# Запустить тесты в режиме watch
npm run test:watch

# Запустить тесты с покрытием
npm run test:coverage
```

## Структура тестов

- `api.test.js` - тесты API endpoints
- `utils.test.js` - тесты утилитарных функций
- `setup.js` - настройка тестового окружения

## Покрытие кода

После запуска `npm run test:coverage` будет создана папка `coverage/` с отчетом о покрытии кода тестами.

## Добавление новых тестов

1. Создайте файл с расширением `.test.js` в папке `tests/`
2. Используйте Jest для написания тестов
3. Для тестирования API используйте Supertest

## Пример теста

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