# Usa a imagem oficial do Node.js
FROM node:20-alpine

# Define a pasta de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia o package.json e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o resto do código da sua API de pedidos de hardware
COPY . .

# Expõe a porta que o backend vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]