const mongoose = require('mongoose')

const chatRoomSchema = mongoose.Schema({
    name:{type: String, required: true},
    description:{type: String},
    users_id:[{type: mongoose.Schema.Types.ObjectId, ref:'user'}],
    createdAt:{type: Date, default: Date.now },
    updatedAt:{type: Date, default: Date.now}
},{
    timestamps: true
})

const ChatRoomModel = mongoose.model('chatRoom', chatRoomSchema)

module.exports = ChatRoomModel