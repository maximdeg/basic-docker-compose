# Figuras Geométricas API con Node y Docker
### Por Maxim Degtiarev

Esta aplicación es un servidor Express.js que, dado un número del 1 al 20, devuelve el nombre geométrico correspondiente a la cantidad de lados indicada. Además, guarda cada consulta válida en un archivo JSON persistente junto con la fecha y permite consultar el historial de resultados.

- [Tecnologías elegidas](#tecnologías-elegidas)
- [Endpoints de prueba](#endpoints-de-prueba)
- [Cómo ejecutar la aplicación](#cómo-ejecutar-la-aplicación)

## Tecnologías elegidas

-  **Node.js + Express.js**: Hace ya varios años que utilizo JavaScript y trabajo freelance con este lenguaje haciendo aplicaciones en Node, Express, React y Next.js y es con el que me siento mas comodo. Utilize los mismos lenguajes para hacer el proyecto de Kubernetes.
  
## Endpoints de prueba

### 1. `http://localhost:8080/fig_geometrica?numero=`

-  **Método:** GET

-  **Parámetro:**  `numero` (obligatorio, entre 1 y 20)

-  **Descripción:** Devuelve el nombre de la figura geométrica correspondiente al número de lados indicado. Imprime el resultado por consola y lo guarda en un archivo JSON persistente junto con la fecha de la consulta.
 
**Modo de uso:**

```

curl "http://localhost:8080/fig_geometrica?numero=5"

```
**Respuesta en el servidor:**
```

Figura geométrica con 7 lados: Pentágono 

```
  

### 2. `http://localhost:8080/ver_resultados`

-  **Método:** GET

-  **Descripción:** Devuelve el contenido completo del archivo JSON con el historial de consultas válidas.

  

**Modo de uso:**

```

curl "http://localhost:8080/ver_resultados"

```

**Respuesta:**

```json

[
  {
    "numero": 5,
    "forma": "Pentágono",
    "timestamp": "6/18/2025"
  },
  {
    "numero": 3,
    "forma": "Triángulo",
    "timestamp": "6/18/2025"
}
]

```

  

## Persistencia

- Los resultados se guardan en `/data/resultados.json` dentro del contenedor.

- El archivo se almacena en un volumen Docker, por lo que persiste aunque el contenedor se reinicie.



## Cómo ejecutar la aplicación

  

1. Clona este repositorio y navega a la carpeta del proyecto.

```sh
git clone https://github.com/maximdeg/basic-docker-compose.git
```

2. Construye y levanta el servicio con Docker Compose:

```sh
docker-compose up --build
```

3. Abrir otra terminal para interactuar desde dentro del contenedor:

```sh
docker-compose exec express-server sh
```

4. Accede a los endpoints desde tu navegador o usando `curl` desde tu máquina o desde el contenedor.
```
curl "http://localhost:8080/fig_geometrica?numero=7"

#Respuesta en la terminal actual: Heptágono# (ctrl+C para volver a la terminal para ejecutar otro comando)
#Respuesta esperada en la terminal del servidor: Heptágono

curl "http://localhost:8080/ver_resultados"

# Respuesta esperada:
[
  {
    "numero": 7,
    "forma": "Heptágono",
    "timestamp": "6/18/2025"
  }
]
```
5. Salir de la terminal que se esta ejecutando los comandos:
   ```
   exit
   ```
7. Salir de la terminal del servidor apretando Ctrl + C y terminar el docker compose:
   ```
   docker-compose down
   ```


