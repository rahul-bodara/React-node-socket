let ioobj = {  }
exports.intilize = (io) => {
    ioobj = io
    io.on('connection', (socket) => {
        console.log('user connected')
        socket.on('disconnect', () => {
            console.log('user disconnect')
        });
    })
}
exports.getIo = () => {
    return ioobj
}