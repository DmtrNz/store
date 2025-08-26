// Настройка тестового окружения
process.env.NODE_ENV = 'test';
process.env.PORT = 3002;

// Увеличиваем таймаут для тестов
jest.setTimeout(10000); 