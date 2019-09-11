## Server to server socket chat

Run server to accept connections. OBS! You only need 1 server running. Clients can be connected from anywhere as long as they have the correct `ROOT_URL`.
`yarn start:server`

Run client to connect to socket and enter the chat.
`yarn start:client`


OBS! If you are not hosting the server then you need to modify `.env` or `.env.local` and specify the `ROOT_URL` for the running server.

Happy chatting! :)
