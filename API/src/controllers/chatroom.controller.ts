import { Request, Response } from "express"
import ChatRoom from "../models/Chatroom"
import Message from "../models/Message"
import Suscription from "../models/Suscription"
import ChatRoomSetting from "../models/ChatRoomSetting"
import { ChatRoomSettingCreationAttributes } from "../customTypes/typesModels"

export async function findAllChatRoom(_req:Request, res:Response){
    try {
        const findAll = await ChatRoom.findAll({
            include: [Message, Suscription, ChatRoomSetting],
        })

        return res.status(200).json(findAll)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export async function findOneChatRoom(req:Request, res:Response){
    try {
        const { id_chatroom } = req.params
        const findChatRoom = await ChatRoom.findByPk(id_chatroom, {
            include: [Message, Suscription, ChatRoomSetting],
        })

        return res.status(200).json(findChatRoom)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export async function createChatRoomGroup(req:Request, res:Response){
    try {
        const usersLimit = req.query.usersLimit && parseInt(req.query.usersLimit.toString())
        const { id_user } = req.params
        const { privacy, category, description, name } = req.body as ChatRoomSettingCreationAttributes

        console.log({usersLimit})

        type ChatRoomModifyAtributte = { usersLimit?: number }
        const parameter:ChatRoomModifyAtributte = {}
        if(usersLimit && typeof usersLimit === 'number') parameter.usersLimit = usersLimit

        const newChatRoom = await ChatRoom.create(parameter)
        await newChatRoom.createChatRoomSetting({
            id_chatroom: newChatRoom.id,
            name,
            description,
            category,
            privacy
        })
        await newChatRoom.createSuscription({
            id_chatroom: newChatRoom.id, 
            id_user,
            role: 'Admin'
        })

        return res.status(200).json(newChatRoom)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export async function deleteChatRoomGroup(req:Request, res:Response){
    try {
        const {id_chatroom} = req.params
        const findAll = await ChatRoom.destroy({ where:{id:id_chatroom} })

        return res.status(200).json(findAll)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export async function inviteUserToChatRoom(req:Request, res:Response){
    try {
        const {id_friend} = req.params
        const {id_chatroom} = req.body
        
        const chatroom = await ChatRoom.findByPk(id_chatroom)
        await chatroom?.addUserToWishList(id_friend)
        await chatroom?.save()

        return res.status(200).json(chatroom)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export async function banUserToChatRoom(req:Request, res:Response){
    try {
        const {id_friend} = req.params
        const {id_chatroom} = req.body
        const chatroom = await ChatRoom.findByPk(id_chatroom)
        await chatroom?.addUserToBlackList(id_friend)
        await chatroom?.save()

        await Suscription.destroy({ where:{id_user:id_friend, id_chatroom} })

        return res.status(200).json(chatroom)
    } catch (error) {
        return res.status(400).json(error)
    }
}