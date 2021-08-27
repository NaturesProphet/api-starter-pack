FROM node:14.17.0-alpine

RUN mkdir -p /usr/app/src
WORKDIR /usr/app

COPY package.json tsconfig.json tsconfig.build.json /usr/app/
RUN npm install
COPY src/ /usr/app/src
RUN npm run build
RUN rm -R node_modules
RUN npm install --prod
RUN rm -R src
RUN ln -s /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime

CMD ["npm","run","start:prod"]