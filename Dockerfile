# Usa uma imagem oficial do Node.js leve
FROM node:20-alpine

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o resto do código da aplicação
COPY . .

# Gera os artefatos do Prisma (Cria a pasta /app/generated)
RUN npx prisma generate

# Builda a aplicação NestJS (Cria a pasta /app/dist)
RUN npm run build

# Expõe a porta
EXPOSE 3000

# Inicia o banco e a aplicação
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main"]