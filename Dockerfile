FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install nodemon


RUN npm install ts-node
RUN npm install -g npm@latest

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD ["npm","run", "dev"]
