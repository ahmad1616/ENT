FROM node:hydrogen-alpine3.20
COPY . /ENT
WORKDIR /ENT
RUN npm install --production
RUN npm run build
EXPOSE 3000
CMD [ "npm","start"]  