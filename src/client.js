
const endpoint = process.env.ROOT_URL
const io_client = require('socket.io-client')(endpoint);

const shortSessionId = process.env.TERM_SESSION_ID.split(':')[0]
const loggedInClientId = `[${shortSessionId}-${process.env.USER}]`

io_client.on('disconnect', () => console.log('Socket Server got disconnected'))

io_client.on('connect', () => {
    io_client.emit('client_connect', { clientId: loggedInClientId })

    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdout.write(`Hi ${process.env.USER}, this is a chat. Write a message and press ENTER:\n`)

    process.stdin.on('data', function (text) {
        if (text.trim() === 'exit()') {
            process.exit()
            return
        }

        io_client.emit('text_message', {
            clientId: loggedInClientId,
            text,
        })
    })
})

io_client.on('new_message', ({ clientId, text }) => {
    process.stdout.write(`\n`)
    process.stdout.write(`${clientId}: ${text}`)
})

io_client.on('new_user', ({ clientId }) => {
    if (clientId === loggedInClientId) return
    process.stdout.write(`\n`)
    process.stdout.write(`User entered chat: ${clientId}\n`)
})

io_client.on('remove_user', ({ clientId }) => {
    if (clientId === loggedInClientId) return

    process.stdout.write(`\n`)
    process.stdout.write(`User exited chat: ${clientId}\n`)
})
