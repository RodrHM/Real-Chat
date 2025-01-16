const {Server, Socket} = require('socket.io')

const init = (server)=>{
    const io = new Server(server)

    io.on("connection", (socket) => {
        socket.on('joinRoom', async (room_id)=>{
            socket.join(room_id)
        })
        
        socket.on('leaveRoom', async (room_id)=>{
            socket.leave(room_id)
        })

        socket.on('sendMessage', async ({room_id, message})=>{
            io.to(room_id).emit('sendMessage', message)
        })

        socket.on('disconnect', async ()=>{ })
    });
}

module.exports = init