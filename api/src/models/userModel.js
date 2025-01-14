const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{type:String, require: true },
    email:{type:String, require: true}
},{
    timestamps: true
})

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel