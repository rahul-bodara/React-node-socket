let ioobj = {  }
exports.intilize = (io) => {
    ioobj = io


    const jwt = require('jsonwebtoken');

    io.use(function(socket, next){
    if (socket.handshake.query && socket.handshake.query.jwt){
        const token = socket.handshake.query.jwt
        const decoded =  jwt.verify(token, 'secret');
        next();
    }
    else {
        next(new Error('Authentication error'));
    }
    })
    .on('connection', function(socket) {
        // Connection now authenticated to receive further events
        socket.on('message', function(message) {
            io.emit('message', message);
        });
    });

    // io.on('connection', (socket) => {
    //     console.log('user connected')
    //     socket.on('disconnect', () => {
    //         console.log('user disconnect')
    //     });
    // })
}
exports.getIo = () => {
    return ioobj
}