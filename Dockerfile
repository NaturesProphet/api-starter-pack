FROM node:14.19.0-alpine

RUN mkdir -p /usr/app/src
WORKDIR /usr/app

COPY package.json tsconfig.json tsconfig.build.json /usr/app/
RUN npm install
COPY src/ /usr/app/src
RUN npm run build
RUN rm -R node_modules
RUN npm install --prod
RUN rm -R src

CMD ["npm","run","start:prod"]