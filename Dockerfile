FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY server.js .

COPY Homebot-*.json ./

COPY intentService ./intentService

COPY ultility ./ultility

ENV GOOGLE_APPLICATION_CREDENTIALS=/usr/src/app/Homebot-3e6752fc210a.json

EXPOSE 8000

CMD [ "node", "server.js" ]