const express = require('express');
require('dotenv').config();
const { dbConnection } = require('../Database/Config');
const cors = require('cors');


const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
       
        this.paths = {
            Imagenes: '/api/imagenes',
            Perfil: '/api/perfil',
            auth: '/api/auth',
            Publicacion: '/api/Public'
        };

        this.connectToDB();
        this.addMiddlewares();
        this.setRoutes();
        // WebSockets
      
    }

    async connectToDB() {
        await dbConnection();
    }

    

    addMiddlewares() {
        this.app.use( cors(corsOptions) );
        this.app.use( express.json() );
        this.app.use( express.static('public') );
    }

    setRoutes() {
        this.app.use(this.paths.auth, require('../Routes/auth'));
        this.app.use(this.paths.Publicacion, require('../Routes/PublicRoutes'));
        this.app.use(this.paths.Perfil, require('../Routes/Perfil'));
        this.app.use(this.paths.Imagenes, require('../Routes/FotosRoutes'));
    }

   

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor Corriendo en el Puerto', process.env.PORT);
        });
    }
}

module.exports = {Server};