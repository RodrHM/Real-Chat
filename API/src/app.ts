import express from 'express'
import http from 'http'
import {Server, Socket} from 'socket.io'
import cors from 'cors'
import morgan from 'morgan'
import router from './routers'
import chatSocket from './socket/chat.socket'

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)

app.use(cors({origin:'*'}))
app.use(express.json({limit:'50mb'}))
app.use(morgan('dev'))

app.use('/api', router)

// Aca agregamos los web sockets
const onConnection = (socket:Socket)=>{
    chatSocket(io, socket)
}
io.on('connection', onConnection)

//------------------------------

export default httpServer;