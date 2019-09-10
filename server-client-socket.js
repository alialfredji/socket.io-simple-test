
const io_client = require('socket.io-client')('http://localhost:3000');

io_client.on('connect', () => {
    io_client.emit('server_client_connected', { clientId: 1 })
    io_client.emit('server_client_connected', { clientId: 2 })
})

io_client.on('disconnect', () => {})