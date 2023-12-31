FROM node:20.10
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npx prisma generate
CMD [ "npm", "run", "start:prod" ]