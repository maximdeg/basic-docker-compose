# Figuras Geométricas API con Node y Docker
### Por Maxim Degtiarev

Esta aplicación es un servidor Express.js que, dado un número del 1 al 20, devuelve el nombre geométrico correspondiente a la cantidad de lados indicada. Además, guarda cada consulta válida en un archivo JSON persistente junto con la fecha y permite consultar el historial de resultados.

## Tecnologías utilizadas
- **Node.js + Express.js**: Para el servidor web.

## Endpoints

### 1. `/fig_geometrica`
- **Método:** GET
- **Parámetro:** `numero` (obligatorio, entre 1 y 20)
- **Descripción:** Devuelve el nombre de la figura geométrica correspondiente al número de lados indicado. Imprime el resultado por consola y lo guarda en un archivo JSON persistente junto con la fecha de la consulta.

**Ejemplo de uso:**
```
curl "http://localhost:8080/fig_geometrica?numero=5"
```
**Respuesta:**
```
Pentágono
```

### 2. `/ver_resultados`
- **Método:** GET
- **Descripción:** Devuelve el contenido completo del archivo JSON con el historial de consultas válidas.

**Ejemplo de uso:**
```
curl "http://localhost:8080/ver_resultados"
```
**Respuesta:**
```json
[
  {
    "numero": 5,
    "forma": "Pentágono",
    "timestamp": "07/06/2024"
  },
  {
    "numero": 3,
    "forma": "Triángulo",
    "timestamp": "07/06/2024"
  }
]
```

## Persistencia
- Los resultados se guardan en `/data/resultados.json` dentro del contenedor.
- El archivo se almacena en un volumen Docker, por lo que persiste aunque el contenedor se reinicie.

## Dockerfile
```Dockerfile
FROM node:18

# Instalar curl para pruebas dentro del contenedor
RUN apt-get update && apt-get install -y curl

WORKDIR /app
COPY package.json ./
COPY index.js ./
RUN npm install
RUN echo "¡Imagen de Express.js construida exitosamente!"
EXPOSE 8080
CMD ["npm", "start"]
```

## docker-compose.yml
```yaml
version: '3.8'
services:
  express-server:
    build: .
    ports:
      - "8080:8080"
    volumes:
      - data:/data
    restart: unless-stopped

volumes:
  data:
```

## Cómo ejecutar la aplicación

1. Clona este repositorio y navega a la carpeta del proyecto.
2. Construye y levanta el servicio con Docker Compose:
   ```sh
   docker-compose up --build
   ```
3. (Opcional) Para interactuar desde dentro del contenedor:
   ```sh
   docker-compose exec express-server bash
   # Luego puedes usar curl dentro del contenedor
   curl "http://localhost:8080/fig_geometrica?numero=7"
   ```
4. Accede a los endpoints desde tu navegador o usando `curl` desde tu máquina o desde el contenedor.

## Notas
- Si el parámetro `numero` está fuera del rango 1-20 o no es válido, el servidor devuelve un mensaje de error y no guarda el resultado.
- El nombre de la figura geométrica también se imprime por consola cada vez que se consulta el endpoint `/fig_geometrica`.

---
