const server = require('http').createServer();
const io = require('socket.io')(server, {
    serveClient: false,
    wsEngine: 'ws' // uws is not supported since it is a native module
});
const port = 3030;

server.listen(port, function () {
    console.log('server listening on port ' + port)
});

exports.initSocket = function (namespace, connectCallback, disconnectCallback) {
    var newIo = io.of('/' + namespace);
    newIo.on('connection', connectCallback);
    newIo.on('disconnect', disconnectCallback);
    return newIo;
};

exports.emit = function (socket, payload) {
    if (!!payload && !!socket) {
        socket.emit('update', payload);
    }
};
