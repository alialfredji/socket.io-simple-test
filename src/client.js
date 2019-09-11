
const endpoint = process.env.ROOT_URL
const io_client = require('socket.io-client')(endpoint);

io_client.on('disconnect', () => console.log('disconnect'))

io_client.on('connect', () => {
    io_client.emit('server_client_connected', { clientId: process.env.USER })

    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdout.write(`Hi ${process.env.USER}, this is a chat. Write a message and press ENTER:\n\n`)

    process.stdin.on('data', function (text) {
        if (text.trim() === 'exit()') {
            process.exit()
            return
        }

        io_client.emit('text_message', {
            clientId: process.env.USER,
            text,
        })
    })
})

io_client.on('new_message', ({ clientId, text }) => {
    process.stdout.write(`[${clientId}]: ${text}`)
})

io_client.on('new_user', ({ clientId, text }) => {
    if (clientId === process.env.USER) return
    process.stdout.write(`new user entered chat: [${clientId}]\n`)
})
