const mongoose = require('mongoose')

const subscriptionSchema = mongoose.Schema({
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    server_id:{type: mongoose.Schema.Types.ObjectId, ref: 'server'},
    chatRoom_id:{type: mongoose.Schema.Types.ObjectId, ref: 'chatRoom'},
    role:{type: String, enum: ['admin', 'mod', 'user'], default: 'user'},
    createdAt:{type: Date, default: Date.now}
})

const subscriptionModel = mongoose.model('subscription', subscriptionSchema)

module.exports = subscriptionModel