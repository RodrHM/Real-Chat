const SubscriptionModel = require('../models/subscriptionModel')


const getSubscription = async (req, res)=>{
    try {
        const { id } = req.params

        const subscription = await SubscriptionModel.findById(id)

        return res.status(200).json({subscription})
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

const getUserSubscription = async (req, res)=>{
    try {
        const { id } = req.params

        const subscription = await SubscriptionModel.find({user_id: id})

        return res.status(200).json({subscription})
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

const getChatRoomSubscription = async (req, res)=>{
    try {
        const { id } = req.params

        const subscription = await SubscriptionModel.find({chatRoom_id: id})

        return res.status(200).json({subscription})
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

const createSubscription = async (req, res)=>{
    try {
        const {user_id, server_id, chatRoom_id, role} = req.body

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
        const { newRole } = req.body

        const subscription = await SubscriptionModel.updateOne(
            {_id: id}, 
            {$set:{role: newRole}}
        )

        return res.status(200).json({subscription})
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

const deleteSubscription = async (req, res)=>{
    try {
        const { id } = req.params

        const deleteSubscription = await SubscriptionModel.deleteOne({_id: id})

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