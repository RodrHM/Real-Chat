const { default: mongoose } = require('mongoose');
const MessageModel = require('../models/messageModel')

const getChatRoomMessage = async (req, res)=>{
    try {
        const { id } = req.params

        if(!id) throw new Error("Falta el dato id");
        if(typeof id !== 'string') throw new Error("El dato id debe ser un string");
        if(id.length !== 24) throw new Error("El id debe tener 24 caracteres");

        const objectId = new mongoose.Types.ObjectId(id)
        const messages = await MessageModel.find({charRoom_id: objectId})

        return res.status(200).json({messages})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const createMessage = async (req, res)=>{
    try {
        const {user_id, chatRoom_id, content} = req.body

        if(!user_id) throw new Error("Falta el dato user_id");
        if(typeof user_id !== 'string') throw new Error("El dato user_id debe ser un string");
        if(user_id.length !== 24) throw new Error("El user_id debe tener 24 caracteres");

        if(!chatRoom_id) throw new Error("Falta el dato chatRoom_id");
        if(typeof chatRoom_id !== 'string') throw new Error("El dato chatRoom_id debe ser un string");
        if(chatRoom_id.length !== 24) throw new Error("El chatRoom_id debe tener 24 caracteres");

        if(!content) throw new Error("Falta el dato content");
        if(typeof content !== 'string') throw new Error("El dato content debe ser un string");

        const obj_user_id = new mongoose.Types.ObjectId(user_id)
        const obj_chatRoom_id = new mongoose.Types.ObjectId(chatRoom_id)

        const newMessage = new MessageModel({
            user_id: obj_user_id,
            chatRoom_id: obj_chatRoom_id,
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

        if(!id) throw new Error("Falta el dato id");
        if(typeof id !== 'string') throw new Error("El dato id debe ser un string");
        if(id.length !== 24) throw new Error("El id debe tener 24 caracteres");

        if(!content) throw new Error("Falta el dato content");
        if(typeof content !== 'string') throw new Error("El dato content debe ser un string");

        const objectId = new mongoose.Types.ObjectId(id)
        const message = await MessageModel({_id: objectId}, {content})

        return req.status(200).json({message})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const deleteMessage = async (req, res)=>{
    try {
        const { id } = req.params

        if(!id) throw new Error("Falta el dato id");
        if(typeof id !== 'string') throw new Error("El dato id debe ser un string");
        if(id.length !== 24) throw new Error("El id debe tener 24 caracteres");

        const object_id = new mongoose.Types.ObjectId(id)
        const deleteMessage = await MessageModel.deleteOne({_id: object_id})

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