
FROM node:alpine

COPY package.json package-lock.json .

RUN npm install 

COPY . .

CMD ["npm", "run", "dev"]