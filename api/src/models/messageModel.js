const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    chatRoom_id:{type: mongoose.Schema.ObjectId, ref: 'chatRoom'},
    content:{type: String, required: true},
    createdAt:{type: Date, default: Date.now }, 
    updatedAt:{type: Date, default: Date.now}

},{
    timestamps: true
})

const MessageModel = mongoose.model('message', messageSchema)

module.exports = MessageModel