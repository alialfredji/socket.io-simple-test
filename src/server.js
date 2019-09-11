
const io = require('socket.io')

const app = require('express')()
const http = require('http').createServer(app)

const linkedSocket = io(http)

linkedSocket.on('connection', (socket) => {
    socket.on('disconnect', () => {
        linkedSocket.emit('remove_user', { clientId: socket.id })
    })

    socket.on('client_connect', (payload) => {
        socket.id = payload.clientId
        linkedSocket.emit('new_user', payload)
    })

    socket.on('text_message', (payload) => {
        linkedSocket.emit('new_message', payload)
    })
})

http.listen(process.env.PORT || '3000', () => {
    console.log(`listening on port: ${process.env.PORT || '3000'}`)
})