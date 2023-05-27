# Usando a imagem do node 20-alpine
FROM node:20-alpine
# Definindo o diretório de trabalho
WORKDIR /app
# Copiando dependências
COPY package.json yarn.lock /app/
# Instalando dependências
RUN yarn install
# Copiando arquivos do diretório atual para o diretório de trabalho
COPY . .
# Expondo a porta 3000
EXPOSE 3001
# Executando o comando yarn dev
CMD ["yarn", "dev"]