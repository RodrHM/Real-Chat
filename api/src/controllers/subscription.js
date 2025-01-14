const { default: mongoose } = require('mongoose');
const SubscriptionModel = require('../models/subscriptionModel')


const getSubscription = async (req, res)=>{
    try {
        const { id } = req.params

        if(!id) throw new Error("Falta el dato id");
        if(typeof id !== 'string') throw new Error("El dato id debe ser un string");
        if(id.length !== 24) throw new Error("El id debe tener 24 caracteres");

        const subscription = await SubscriptionModel.findById(id)

        return res.status(200).json({subscription})
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

const getUserSubscription = async (req, res)=>{
    try {
        const { id } = req.params

        if(!id) throw new Error("Falta el dato id");
        if(typeof id !== 'string') throw new Error("El dato id debe ser un string");
        if(id.length !== 24) throw new Error("El id debe tener 24 caracteres");

        const subscription = await SubscriptionModel.find({user_id: id})

        return res.status(200).json({subscription})
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

const getChatRoomSubscription = async (req, res)=>{
    try {
        const { id } = req.params

        if(!id) throw new Error("Falta el dato id");
        if(typeof id !== 'string') throw new Error("El dato id debe ser un string");
        if(id.length !== 24) throw new Error("El id debe tener 24 caracteres");

        const subscription = await SubscriptionModel.find({chatRoom_id: id})

        return res.status(200).json({subscription})
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

const createSubscription = async (req, res)=>{
    try {
        const {user_id, server_id, chatRoom_id, role} = req.body

        if(!user_id) throw new Error("Falta el dato user_id");
        if(typeof user_id !== 'string') throw new Error("El dato user_id debe ser un string");
        if(user_id.length !== 24) throw new Error("El user_id debe tener 24 caracteres");

        if(!server_id) throw new Error("Falta el dato server_id");
        if(typeof server_id !== 'string') throw new Error("El dato server_id debe ser un string");
        if(server_id.length !== 24) throw new Error("El server_id debe tener 24 caracteres");

        if(!chatRoom_id) throw new Error("Falta el dato chatRoom_id");
        if(typeof chatRoom_id !== 'string') throw new Error("El dato chatRoom_id debe ser un string");
        if(chatRoom_id.length !== 24) throw new Error("El chatRoom_id debe tener 24 caracteres");

        if(!role) throw new Error("Falta el dato role");
        if(typeof role !== 'string') throw new Error("El dato role debe ser un string");

        const newSubscription = new SubscriptionModel({user_id, server_id, chatRoom_id, role})
        await newSubscription.save()

        return res.status(200).json({newSubscription})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const modifyRoleSubscription = async (req, res)=>{
    try {
        const { id } = req.params
        const { role } = req.body

        if(!id) throw new Error("Falta el dato id");
        if(typeof id !== 'string') throw new Error("El dato id debe ser un string");
        if(id.length !== 24) throw new Error("El id debe tener 24 caracteres");
        if(!role) throw new Error("");
        if(typeof role === 'string') throw new Error("");    

        const objectId = new mongoose.Types.ObjectId(id)
        const subscription = await SubscriptionModel.updateOne(
            {_id: objectId}, 
            {$set:{role: role}}
        )

        return res.status(200).json({subscription})
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

const deleteSubscription = async (req, res)=>{
    try {
        const { id } = req.params

        if(!id) throw new Error("Falta el dato id");
        if(typeof id !== 'string') throw new Error("El dato id debe ser un string");
        if(id.length !== 24) throw new Error("El id debe tener 24 caracteres");

        const objectId = new mongoose.Types.ObjectId(id)
        const deleteSubscription = await SubscriptionModel.deleteOne({_id: objectId})

        return res.status(200).json({deleteSubscription})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports = {
    getSubscription,
    getUserSubscription,
    getChatRoomSubscription,
    createSubscription,
    modifyRoleSubscription,
    deleteSubscription
}