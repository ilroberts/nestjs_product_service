FROM node:bullseye-slim

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/main.js"]