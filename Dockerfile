# Etapa 1: Construcción
FROM node:latest AS build

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . /app/

RUN npm run build --prod

# Etapa 2: Servir la aplicación
FROM nginx:latest

WORKDIR /usr/share/nginx/html/

COPY --from=build /app/dist/gestor-tareas-angular/browser ./

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
