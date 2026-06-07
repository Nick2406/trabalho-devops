# Usa a imagem oficial do Node.js
FROM node:20-alpine

# Define a pasta de trabalho
WORKDIR /usr/src/app

# Copia dependências e instala
COPY package*.json ./
RUN npm install

# Copia o código do React
COPY . .

# Expõe a porta do Vite
EXPOSE 5173

# Comando para iniciar o frontend em modo dev
CMD ["npm", "run", "dev", "--", "--host"]