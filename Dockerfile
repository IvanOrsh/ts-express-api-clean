FROM node:18.16.1-bullseye
WORKDIR /usr/src/ts-express-api-clean
COPY package.json .
RUN npm install --only-prod
COPY ./dist ./dist
EXPOSE 5000
CMD npm start