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
            // * Validate the JWT_KEY, if the token is not valid disconnect it
            const [valid, uid] = verifyJWT(socket.handshake.query['x-token']);
            if (!valid) {
                console.log('socket no identificado');
                return socket.disconnect();
            }

            // * Know which user is active through the uid
            await userConnected(uid);

            // * join user to socket.io room
            socket.join(uid);

            // * emit all connected users
            this.io.emit('list-users', await getUsers());

            // * listen when the user sends a message
            socket.on('personal-message', async (payload) => {
                const message = await saveMessage(payload);
                this.io.to(payload.to).emit('personal-message', message);
                this.io.to(payload.from).emit('personal-message', message);
            });

            // * disconnect, mark in the database that the user disconnected
            socket.on('disconnect', async () => {
                await userDisconnected(uid);
                this.io.emit('list-users', await getUsers());
            });

            // TODO: emitir todos los usuarios conectados
        });
    }
}

module.exports = Sockets;
