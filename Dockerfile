FROM node:latest


WORKDIR /app 

COPY . .

RUN rm -rf node_modules

RUN yarn install 

RUN  yarn migration

CMD ["yarn", "start"]

EXPOSE 5002
