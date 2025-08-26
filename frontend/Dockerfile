# Этап сборки
FROM node:22-alpine AS builder
# Устанавливаем рабочую директорию
WORKDIR /app
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
# Копируем файлы зависимостей
COPY package*.json ./
# Устанавливаем зависимости
RUN npm ci
# Копируем исходный код
COPY . .
# Собираем приложение
RUN npm run build



# Этап продакшена с nginx
FROM nginx:alpine AS production
# Копируем собранные файлы из builder этапа
COPY --from=builder /app/dist /usr/share/nginx/html
# Открываем порт
EXPOSE 80
# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"] 