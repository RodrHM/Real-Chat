const { Server } = require('socket.io')
const app = require('./src/app')
const { createServer } = require('node:http')
const init = require('./src/sockets')
require('./src/db')

const PORT = process.env.PORT || 3001

const server = createServer(app)
init(server)

server.listen(PORT, ()=>{
    console.log(`Server is listening at Port ${PORT}`)
})
