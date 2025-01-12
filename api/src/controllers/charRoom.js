const ChatRoomModel = require('../models/chatRoomModel')

const getChatRoom = async (req, res)=>{
    try {
        const { id } = req.params

        const chatRoom = await ChatRoomModel.findById(id)

        return res.status(200).json({chatRoom})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const getUserChatRooms = async (req, res)=>{
    try {
        const { id } = req.params

        const chatRooms = await ChatRoomModel.find({users_id: id})

        return res.status(200).json({chatRooms})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const createChatRoom = async (req, res)=>{
    try {
        const {name, description, users_id} = req.body

        const newChatRoom = new ChatRoomModel({
            name,
            description,
            users_id
        })

        return res.status(200).json({newChatRoom})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const modifyChatRoom = async (req, res)=>{
    try {
        const { id } = req.params
        const {name, description} = req.body

        const modChatRoom = await ChatRoomModel.updateOne({_id: id}, {$set: {name, description}})
        
        return res.status(200).json({modChatRoom})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const addUserToChatRoom = async (req, res)=>{
    try {
        const { id } = req.params
        const { user_id } = req.body

        const modChatRoom = await ChatRoomModel.updateOne({_id: id}, {$push: {users_id: user_id}})
        
        return res.status(200).json({modChatRoom})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const deleteUserToChatRoom = async (req, res)=>{
    try {
        const { id } = req.params
        const { user_id } = req.body

        const modChatRoom = await ChatRoomModel.updateOne({_id: id}, {$pull: {users_id: user_id}})
        
        return res.status(200).json({modChatRoom})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const deleteChatRoom = async (req, res)=>{
    try {
        const { id } = req.params

        const deleteChatRoom = await ChatRoomModel.deleteOne({_id: id})

        return res.status(200).json({deleteChatRoom})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports = {
    getChatRoom,
    getUserChatRooms,
    createChatRoom,
    modifyChatRoom,
    addUserToChatRoom,
    deleteUserToChatRoom,
    deleteChatRoom
}