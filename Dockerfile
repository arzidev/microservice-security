FROM node:20-alpine AS builder

WORKDIR /security

COPY package.json ./
RUN yarn install

EXPOSE 3100

CMD ["yarn", "start:dev"]