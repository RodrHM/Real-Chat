const MessageModel = require('../models/messageModel')

const getChatRoomMessage = async (req, res)=>{
    try {
        const { id } = req.params

        const messages = await MessageModel.find({charRoom_id: id})

        return res.status(200).json({messages})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const createMessage = async (req, res)=>{
    try {
        const {user_id, chatRoom_id, content} = req.body

        const newMessage = new MessageModel({
            user_id,
            chatRoom_id,
            content,
        })
        await newMessage.save()

        return res.status(200).json({newMessage})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const modifyMessage = async (req, res)=>{
    try {
        const { id } = req.params
        const { content } = req.body

        const modMessage = await MessageModel({_id: id}, {content})

        return 
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const deleteMessage = async (req, res)=>{
    try {
        const { id } = req.params

        const deleteMessage = await MessageModel.deleteOne({_id: id})

        return res.status(200).json({deleteMessage})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports = {
    getChatRoomMessage,
    createMessage,
    modifyMessage,
    deleteMessage
}