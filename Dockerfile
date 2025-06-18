FROM node:18
RUN apt-get update && apt-get install -y curl
WORKDIR /app
COPY package.json ./
COPY index.js ./
RUN npm install
RUN echo "Imagen de Node.js construida exitosamente!🚀"
EXPOSE 8080
ENTRYPOINT ["npm", "start"]