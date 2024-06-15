# Используем Node.js для создания и сборки React приложения
FROM node:16 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы и билдим проект
COPY . .
RUN npm run build

# Используем тот же образ Node.js для финального контейнера
FROM node:16-alpine

# Копируем собранные файлы из предыдущего этапа
COPY --from=build /app /app

# Устанавливаем рабочую директорию
WORKDIR /app

# Экспонируем порт 3000 для доступа к приложению
EXPOSE 3000

# Команда для запуска React приложения
CMD ["npm", "start"]