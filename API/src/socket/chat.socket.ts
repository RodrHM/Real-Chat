
import { Server, Socket } from "socket.io"

const chatSocket = (io:Server, socket:Socket)=>{
    console.log(io)
    socket.on('client:joiChat', async (chatId)=>{
        // const aux = socket.leave()
        // console.log([...socket.rooms])
        socket.join(chatId)
        socket.emit('server:sendMessage', `Te has unido al chat ${chatId}`)
    })
    socket.on('client:leaveChat', async (chatId)=>{
        socket.leave(chatId)
        socket.emit('server:sendMessage', `Has dejado el chat ${chatId}`)
    })

    socket.on('client:sendMessage', (chatId, message)=>{
        console.log(socket.rooms)
        socket.to(chatId).emit('server:sendMessage', message)
    })
}

export default chatSocket;