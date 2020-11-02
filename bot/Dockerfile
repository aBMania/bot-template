FROM node:14-alpine

RUN yarn set version berry

RUN mkdir -p /app
WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml .pnp.js /app/
COPY .yarn /app/.yarn

RUN yarn install --immutable --inline-builds

COPY tsconfig.json tsconfig.build.json /app/
COPY src /app/src
# COPY test /app/test

RUN yarn build

COPY .eslintrc.js /app/

CMD [ "yarn", "run", "start:prod" ]
