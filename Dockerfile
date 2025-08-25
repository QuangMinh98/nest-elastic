FROM node:24.4.1-alpine
WORKDIR /usr/app
COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./
RUN yarn install
COPY . .

RUN yarn run build
CMD yarn run start:prod