FROM node:24.12.0-alpine

WORKDIR /app


COPY . .


RUN npm ci

EXPOSE 5000

CMD ["node", "src/index.js"]