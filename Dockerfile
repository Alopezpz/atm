FROM node:23-alpine

WORKDIR /atm
COPY package.json .
RUN npm install

COPY . .
CMD npm start