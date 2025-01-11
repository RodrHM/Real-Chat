const mongoose = require('mongoose')

const subscriptionSchema = mongoose.Schema({
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    server_id:{type: mongoose.Schema.Types.ObjectId, ref: 'server', default: null},
    chatRoom_id:{type: mongoose.Schema.Types.ObjectId, ref: 'chatRoom', default: null},
    role:{type: String, enum: ['admin', 'mod', 'user'], default: 'user'},
    createdAt:{type: Date, default: Date.now}
})

const SubscriptionModel = mongoose.model('subscription', subscriptionSchema)

module.exports = SubscriptionModel