FROM node:latest


WORKDIR /app 

COPY . .

RUN yarn install 

RUN  yarn migration

EXPOSE 5002

CMD ["yarn", "start"] > /app/start.log 2>&1

