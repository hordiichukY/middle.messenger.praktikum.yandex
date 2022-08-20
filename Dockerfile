FROM node:16.14.1
WORKDIR /var/www
COPY package*.json ./ 
RUN npm install
COPY . .
EXPOSE $PORT
CMD npm run start