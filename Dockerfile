FROM node:18-alpine3.17

WORKDIR /usr/app

COPY package*.json /usr/app/

RUN npm install

COPY . .

ENV MONGO_URI=mongodb+srv://jhanavrojlookout:sVvfJfxKxT3gnApO@learning.kudymrn.mongodb.net/?appName=learning
ENV MONGO_USERNAME=jhanavrojlookout
ENV MONGO_PASSWORD=sVvfJfxKxT3gnApO

EXPOSE 3000

CMD [ "npm", "start" ]