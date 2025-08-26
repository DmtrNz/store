/* global process */
// Тестовый файл для проверки переменных окружения
console.log('VITE_BACKEND_URL:', process.env.VITE_BACKEND_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Все переменные окружения:', Object.keys(process.env).filter(key => key.startsWith('VITE_'))); 