


Promise.all([
    require('./src/env'),
])
    .then(() => {
        if (process.env.SOCKET_ENV === 'server') {
            require('./src/server')
        }
        
        if (process.env.SOCKET_ENV === 'client') {
            require('./src/client')
        }
    })
    .catch(err => console.error('BOOT ERROR ***', err))
