FROM node:21-alpine AS build



WORKDIR /src/App

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

FROM nginx:1.27.0-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf *


COPY --from=build /src/App/dist .

EXPOSE 80

CMD ["nginx","-g","daemon off"]