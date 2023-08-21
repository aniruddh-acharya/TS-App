FROM node:14

WORKDIR /app

COPY package*.json ./

RUN rm -rf node_modules
RUN npm install

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD ["npm","start"]
