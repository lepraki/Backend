const express = require('express');
require('dotenv').config();
const { dbConnection } = require('../Database/Config');
const cors = require('cors');
const { socketController } = require('../Sockets/Controller');

// const corsOptions = {
//     origin: '*',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//   };

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server, {
            cors: {origin: "http://localhost:5173"}
        });

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
        this.sockets();
    }

    async connectToDB() {
        await dbConnection();
    }

    

    addMiddlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.static('public') );
    }

    setRoutes() {
        this.app.use(this.paths.auth, require('../Routes/auth'));
        this.app.use(this.paths.Publicacion, require('../Routes/PublicRoutes'));
        this.app.use(this.paths.Perfil, require('../Routes/Perfil'));
        this.app.use(this.paths.Imagenes, require('../Routes/FotosRoutes'));
    }

    sockets() {
        // Cuando se Conecta
        this.io.on('connection', 
            socket => socketController(socket, this.io));
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor Corriendo en el Puerto', process.env.PORT);
        });
    }
}

module.exports = {Server};