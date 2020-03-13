FROM node:10.8.0

LABEL maintainer="thuoc.nv"

RUN yarn global add node-gyp -s

COPY package.json yarn.lock /app/

WORKDIR /app

RUN ["yarn"]

COPY . /app

CMD ["yarn", "start"]