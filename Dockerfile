FROM node:16
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN npx prisma generate
EXPOSE 3300
CMD [ "npm", "start" ]
