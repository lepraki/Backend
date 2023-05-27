const express = require('express');
require('dotenv').config();
const { dbConnection } = require('../Database/Config');
const cors = require('cors');
const { socketController } = require('../Sockets/Controller');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server, {
            cors: {origin: "http://localhost:3000"}
        });

        this.paths = {
            Fotos: '/api/Fotos',
            Chat: '/api/Chat',
            User: '/api/User',
            Public: '/api/Public'
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
        this.app.use(this.paths.auth, require('../Routes/FotosRoutes'));
        this.app.use(this.paths.producto, require('../Routes/PublicRoutes'));
        this.app.use(this.paths.restaurante, require('../Routes/UserRoutes'));
        this.app.use(this.paths.imagen, require('../Routes/ChatRoutes'));
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