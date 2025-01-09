const UserModel = require('../models/userModel')


const getUsers = async (req, res)=>{
    try {
        const users = await UserModel.find()

        return res.status(200).json({users})
    } catch(error) {
        return res.status(400).json({error: error.message})
    }
}

const getUser = async (req, res)=>{
    try {
        const {id} = req.params

        const user = await UserModel.findById(id)

        return res.status(200).json({user})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const createUser = async (req, res)=>{
    try {
        const {username, email} = req.body

        const newUser = new UserModel({
            username, email
        })
        await newUser.save()

        return res.status(200).json({newUser})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const modifyUser = async (req, res)=>{
    try {
        const {id} = req.params
        const {username} = req.body

        let parameters = {
            username: username
        }
        const user = await UserModel.updateOne({_id:id}, {$set:parameters})

        return res.status(200).json({user})
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

const deleteUser = async (req, res)=>{
    try {
        const {id} = req.params

        const deleteUser = await UserModel.deleteOne({_id:id})

        return res.status(200).json({deleteUser})
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    modifyUser,
    deleteUser
}