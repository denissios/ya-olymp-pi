FROM node:14-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN npm i -g @nestjs/cli --silent

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start:debug"]