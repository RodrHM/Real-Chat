const mongoose = require('mongoose')

const chatRoomSchema = mongoose.Schema({
    name:{type: String, required: true},
    description:{type: String},
    users_id:[{type: mongoose.Schema.Types.ObjectId, ref:'user'}]
},{
    timestamps: true
})

const ChatRoomModel = mongoose.model('chatRoom', chatRoomSchema)

module.exports = ChatRoomModel