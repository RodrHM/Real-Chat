const { default: mongoose } = require('mongoose');
const ChatRoomModel = require('../models/chatRoomModel')

const getChatRoom = async (req, res)=>{
    try {
        const { id } = req.params

        if(!id) throw new Error("Falta el dato id");
        if(typeof id !== 'string') throw new Error("El dato id debe ser un string");
        if(id.length !== 24) throw new Error("El id debe tener 24 caracteres");

        const objectId = new mongoose.Types.ObjectId(id)
        const chatRoom = await ChatRoomModel.findById(objectId)

        return res.status(200).json({chatRoom})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const getUserChatRooms = async (req, res)=>{
    try {
        const { id } = req.params

        if(!id) throw new Error("Falta el dato id");
        if(typeof id !== 'string') throw new Error("El dato id debe ser un string");
        if(id.length !== 24) throw new Error("El id debe tener 24 caracteres");

        const objectId = new mongoose.Types.ObjectId(id)
        const chatRooms = await ChatRoomModel.find({users_id: objectId})

        return res.status(200).json({chatRooms})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const createChatRoom = async (req, res)=>{
    try {
        const {name, description, users_id} = req.body

        if(!name) throw new Error("Falta el dato name");
        if(typeof name !== 'string') throw new Error("El dato name debe ser un string");

        if(!description) throw new Error("Falta el dato description");
        if(typeof description !== 'string') throw new Error("El dato description debe ser un string");

        if(!users_id) throw new Error("Falta el dato users_id");
        if(typeof users_id !== 'string') throw new Error("El dato users_id debe ser un string");
        if(users_id.length !== 24) throw new Error("El users_id debe tener 24 caracteres");

        const objectId = new mongoose.Types.ObjectId(users_id)
        const newChatRoom = new ChatRoomModel({
            name,
            description,
            users_id: objectId
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

        if(!id) throw new Error("Falta el dato id");
        if(typeof id !== 'string') throw new Error("El dato id debe ser un string");
        if(id.length !== 24) throw new Error("El id debe tener 24 caracteres");

        if(!name) throw new Error("Falta el dato name");
        if(typeof name !== 'string') throw new Error("El dato name debe ser un string");

        if(!description) throw new Error("Falta el dato description");
        if(typeof description !== 'string') throw new Error("El dato description debe ser un string");

        const objectId = new mongoose.Types.ObjectId(id)
        const modChatRoom = await ChatRoomModel.updateOne({_id: objectId}, {$set: {name, description}})
        
        return res.status(200).json({modChatRoom})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const addUserToChatRoom = async (req, res)=>{
    try {
        const { id } = req.params
        const { user_id } = req.body

        if(!id) throw new Error("Falta el dato id");
        if(typeof id !== 'string') throw new Error("El dato id debe ser un string");
        if(id.length !== 24) throw new Error("El id debe tener 24 caracteres");

        if(!user_id) throw new Error("Falta el dato user_id");
        if(typeof user_id !== 'string') throw new Error("El dato user_id debe ser un string");
        if(user_id.length !== 24) throw new Error("El user_id debe tener 24 caracteres");

        const objectId_one = new mongoose.Types.ObjectId(id)
        const objectId_two = new mongoose.Types.objectId(id)
        const modChatRoom = await ChatRoomModel.updateOne({_id: objectId_one}, {$push: {users_id: objectId_two}})
        
        return res.status(200).json({modChatRoom})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const deleteUserToChatRoom = async (req, res)=>{
    try {
        const { id } = req.params
        const { user_id } = req.body

        if(!id) throw new Error("Falta el dato id");
        if(typeof id !== 'string') throw new Error("El dato id debe ser un string");
        if(id.length !== 24) throw new Error("El id debe tener 24 caracteres");

        if(!user_id) throw new Error("Falta el dato user_id");
        if(typeof user_id !== 'string') throw new Error("El dato user_id debe ser un string");
        if(user_id.length !== 24) throw new Error("El user_id debe tener 24 caracteres");

        const objectId_one = new mongoose.Types.ObjectId(id)
        const objectId_two = new mongoose.Types.objectId(id)

        const modChatRoom = await ChatRoomModel.updateOne({_id: objectId_one}, {$pull: {users_id: objectId_two}})
        
        return res.status(200).json({modChatRoom})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const deleteChatRoom = async (req, res)=>{
    try {
        const { id } = req.params

        if(!id) throw new Error("Falta el dato id");
        if(typeof id !== 'string') throw new Error("El dato id debe ser un string");
        if(id.length !== 24) throw new Error("El id debe tener 24 caracteres");

        const objectId = new mongoose.Types.ObjectId(id)
        const deleteChatRoom = await ChatRoomModel.deleteOne({_id: objectId})

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