
const app = require('express')()
const http = require('http').createServer(app)

require('./server-client-socket')
require('./server-socket')(http)

http.listen(3000, () => {
    console.log('listening on *:3000')
})