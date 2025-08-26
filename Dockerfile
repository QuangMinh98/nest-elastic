FROM node:24.4.1-alpine
WORKDIR /usr/app
COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./
RUN curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose \
    && chmod +x /usr/local/bin/docker-compose
RUN yarn install
COPY . .

RUN yarn run build
CMD yarn run start:prod