FROM node:16-alpine

RUN apk add --no-cache python3 g++ make

WORKDIR /app

COPY package*.json ./

RUN npm install 

RUN apk add ffmpeg

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]