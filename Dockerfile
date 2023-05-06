FROM node:bullseye-slim

WORKDIR /src

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

USER node

CMD ["node", "dist/main.js"]