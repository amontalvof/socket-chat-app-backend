const path = require('path');
const cors = require('cors');
const colors = require('colors/safe');
// Express Server
const express = require('express');
// HTTP Server
const http = require('http');
// Socket Server
const socketIo = require('socket.io');
const { dbConnection } = require('../database/config');

const Sockets = require('./sockets');
class Server {
    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        // Connection to DB
        dbConnection();
        // HTTP Server
        this.server = http.createServer(this.app);
        // Socket configurations
        this.io = socketIo(this.server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
            },
        });
    }

    middlewares() {
        // Display the public directory
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        // CORS
        this.app.use(cors());
        // body parse
        this.app.use(express.json());
        // API endpoints
        this.app.use('/api/login', require('../router/auth'));
    }

    socketsConfiguration() {
        new Sockets(this.io);
    }

    execute() {
        //Initialize Middlewares
        this.middlewares();
        // Initialize Sockets
        this.socketsConfiguration();
        //Initialize Server
        this.server.listen(this.port, () => {
            console.log(colors.cyan(`Server running on port ${this.port}`));
        });
    }
}

module.exports = Server;
