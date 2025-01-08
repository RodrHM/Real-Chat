const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{type:String, require: true },
    email:{type:String, require: true},
    createAt:{type:Date, default: Date.now},
    updateAt:{type:Date, default: Date.now}
},{
    timestamps: true
})

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel