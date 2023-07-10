FROM node:18.4.0-alpine
WORKDIR /usr/src/ts-express-api-clean
COPY package.json .
RUN npm pkg delete scripts.prepare && npm install --omit=dev