# Многоэтапная сборка для оптимизации размера образа
FROM node:22-alpine AS builder
# Устанавливаем рабочую директорию
WORKDIR /app
# Копируем файлы зависимостей
COPY package*.json ./
# Устанавливаем зависимости
RUN npm install

# Этап продакшена
FROM node:22-alpine AS production
# Устанавливаем рабочую директорию
WORKDIR /app
# Устанавливаем curl для health check
RUN apk add --no-cache curl

# Копируем зависимости из builder этапа
COPY --from=builder /app/node_modules ./node_modules
# Копируем исходный код
COPY . .
# Открываем порт
EXPOSE 3001
# Запускаем приложение
CMD ["sh", "-c", "node scripts/setup-database.js && npm start"]