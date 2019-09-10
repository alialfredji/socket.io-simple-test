
const io = require('socket.io')

module.exports = (http) => {
    const linkedSocket = io(http)

    linkedSocket.on('connection', (socket) => {
        console.log('Connected to server socket')
    
        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
        
        socket.on('server_client_connected', (payload) => {
            console.log('server_client_connected: ', payload)
        })
    });
}