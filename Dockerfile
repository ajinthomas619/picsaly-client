FROM node:21-alpine



WORKDIR /src/App

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5173

FROM nginx:1.27.0-alpine

WORKDIR /usr/share/nginx/html

RUN rm-rf *


COPY --from=build /App/build .

EXPOSE 80

CMD ["nginx","-g","daemon off"]