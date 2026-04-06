# Stage 1: Збирання проєкту
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Фінальний образ для запуску (Nginx)
FROM nginx:alpine
# Копіюємо зібрані файли з папки dist
COPY --from=builder /app/dist /usr/share/nginx/html
# Копіюємо базові налаштування nginx (якщо необхідно, але для лаби вистачить дефолтних)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]