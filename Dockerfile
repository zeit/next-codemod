FROM mhart/alpine-node:9.11.1
WORKDIR /src
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . ./
RUN yarn test
