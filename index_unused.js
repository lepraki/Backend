const express = require('express');
const { dbConection } = require('./Batabase/Config');

require('dotenv').config();
// Crear Express App
const app = express();
const cors = require('cors');

// Base de Datos
dbConection();

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',

  };
// Use Plugins
app.use( cors(corsOptions) );
app.use(express.static('public'));
app.use(express.json());

// Rutas
app.get('/', (request, response) => {
    response.json({
        ok: true
    });
});
// Rutas del Auth
app.use('/api/auth', require('./Routes/auth'));

// Escuchar el puerto 4000
app.listen(process.env.PORT, () => {
    console.log('Servidor Corriendo en el Puerto', 4000);
});