FROM node:16.14
WORKDIR /var/www
COPY package*.json ./ 
RUN npm install
COPY . .
EXPOSE 3000
CMD npm run start