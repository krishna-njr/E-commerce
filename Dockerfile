
FROM node:alpine

COPY package.json package-lock.json .

RUN npm install 

RUN npx prisma generate

COPY . .

CMD ["npm", "run", "dev"]