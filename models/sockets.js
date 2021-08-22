const { verifyJWT } = require('../helpers/jsonWebToken');
const {
    userConnected,
    userDisconnected,
    getUsers,
    saveMessage,
} = require('../controllers/sockets');
class Sockets {
    constructor(io) {
        this.io = io;
        this.socketsEvents();
    }

    socketsEvents() {
        // On connection
        this.io.on('connection', async (socket) => {
            const [valid, uid] = verifyJWT(socket.handshake.query['x-token']);
            if (!valid) {
                console.log('socket no identificado');
                return socket.disconnect();
            }

            await userConnected(uid);
            // join user to socket.io room
            socket.join(uid);
            // TODO: Validar el JWT_KEY
            // si el token no es valido desconectarlo

            // TODO: Saber que usuario esta activo mediante el uid

            // TODO: Emitir todos los usuarios conectados
            this.io.emit('list-users', await getUsers());

            // TODO:  Socket join

            // TODO: escuchar cuando el cliente manda un mensaje
            socket.on('personal-message', async (payload) => {
                const message = await saveMessage(payload);
                console.log(message);
            });

            // TODO: disconnect
            // marcar en la bd que el usuario se desconecto
            socket.on('disconnect', async () => {
                await userDisconnected(uid);
                this.io.emit('list-users', await getUsers());
            });

            // TODO: emitir todos los usuarios conectados
        });
    }
}

module.exports = Sockets;
