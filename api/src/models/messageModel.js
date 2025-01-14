const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    chatRoom_id:{type: mongoose.Schema.ObjectId, ref: 'chatRoom', required: true},
    content:{type: String, required: true}
},{
    timestamps: true
})

const MessageModel = mongoose.model('message', messageSchema)

module.exports = MessageModel