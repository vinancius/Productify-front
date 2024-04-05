FROM node:alpine

# Diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiando os arquivos do Angular para o contêiner
COPY . .

RUN npm install -g @angular/cli

#Dependências do projeto
RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]