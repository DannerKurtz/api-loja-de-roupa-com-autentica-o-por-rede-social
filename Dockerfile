FROM node:latest

WORKDIR /app

COPY . .

RUN yarn install

# Adiciona um passo para verificar variáveis de ambiente
RUN printenv

# Executa a migração
RUN echo "Running migrations..." 
RUN yarn migration

EXPOSE 5002
CMD ["yarn", "start"]

