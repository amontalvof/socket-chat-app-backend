class Sockets {
    constructor(io) {
        this.io = io;
        this.socketsEvents();
    }

    socketsEvents() {
        // On connection
        this.io.on('connection', (socket) => {
            console.log('Client connected!', socket.id);
            // TODO: Validar el JWT_KEY
            // si el token no es valido desconectarlo

            // TODO: Saber que usuario esta activo mediante el uid

            // TODO: Emitir todos los usuarios conectados

            // TODO:  Socket join

            // TODO: escuchar cuando el cliente manda un mensaje
            // mensaje-personal

            // TODO: disconnect
            // marcar en la bd que el usuario se desconecto

            // TODO: emitir todos los usuarios conectados
        });
    }
}

module.exports = Sockets;
