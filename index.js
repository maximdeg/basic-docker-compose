const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 8080;

const LOG_PATH = '/data/resultados.json';
const LOG_DIR = path.dirname(LOG_PATH);

const nombresGeometricos = {
  1: 'Monógono',
  2: 'Dígono',
  3: 'Triángulo',
  4: 'Cuadrado',
  5: 'Pentágono',
  6: 'Hexágono',
  7: 'Heptágono',
  8: 'Octógono',
  9: 'Eneágono',
 10: 'Decágono',
 11: 'Hendecágono',
 12: 'Dodecágono',
 13: 'Tridecágono',
 14: 'Tetradecágono',
 15: 'Pentadecágono',
 16: 'Hexadecágono',
 17: 'Heptadecágono',
 18: 'Octadecágono',
 19: 'Eneadecágono',
 20: 'Icoságono'
};

app.get('/fig_geometrica', (req, res) => {
  const { numero } = req.query;
  let result;
  let forma = null;

  const n = parseInt(numero, 10);
  if (!numero || isNaN(n)) {
    result = 'Parámetro "numero" no proporcionado o no es un número válido';
  } else if (n < 1 || n > 20) {
    result = 'El número debe ser entre 1 y 20';
  } else {
    forma = nombresGeometricos[n];
    result = forma;
    console.log(`Figura geométrica con ${n} lados: ${forma}`);
  }

  if (forma) {
    if (!fs.existsSync(LOG_DIR)) {
      fs.mkdirSync(LOG_DIR, { recursive: true });
    }
    let resultados = [];
    if (fs.existsSync(LOG_PATH)) {
      try {
        const data = fs.readFileSync(LOG_PATH, 'utf8');
        resultados = JSON.parse(data);
      } catch (e) {
        resultados = [];
      }
    }
    resultados.push({
      numero: n,
      forma: forma,
      timestamp: new Date().toLocaleDateString()
    });
    fs.writeFileSync(LOG_PATH, JSON.stringify(resultados, null, 2));
  }

  res.send(result);
});

app.get('/ver_resultados', (req, res) => {
  if (fs.existsSync(LOG_PATH)) {
    try {
      const data = fs.readFileSync(LOG_PATH, 'utf8');
      console.log('Contenido de resultados.json:', data);
      res.type('application/json').send(data);
    } catch (e) {
      res.status(500).send('Error al leer el archivo de resultados');
    }
  } else {
    res.status(404).send('No hay resultados guardados');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en puerto ${PORT}`);
});
