FROM node:10 AS build
MAINTAINER The Revolution Populi Project

RUN npm install -g cross-env

WORKDIR /bitshares-ui
ENV BRANCH master

COPY package* ./
RUN cross-env npm install --env.prod
COPY . .
RUN npm run build

FROM nginx:1.19 as run
MAINTAINER The Revolution Populi Project

COPY --from=build /bitshares-ui/build/dist /usr/share/nginx/html
COPY conf/nginx.conf /etc/nginx/nginx.conf
