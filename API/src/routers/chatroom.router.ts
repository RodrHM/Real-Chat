import { Request, Response, Router } from "express";
import ChatRoom from "../models/Chatroom";
import Message from "../models/Message";
import Suscription from "../models/Suscription";
import ChatRoomSetting from "../models/ChatRoomSetting";
import { ChatRoomSettingAttributes, ChatRoomSettingCreationAttributes, MessageCreateAttributes } from "../customTypes/typesModels";


const router = Router()

router.get('/', async (_req:Request, res:Response)=>{
    try {
        const findAll = await ChatRoom.findAll({
            include: [Message, Suscription, ChatRoomSetting],
        })

        return res.status(200).json(findAll)
    } catch (error) {
        return res.status(400).json(error)
    }
})

router.get('/:id_chatroom', async (req:Request, res:Response)=>{
    try {
        const { id_chatroom } = req.params
        const findChatRoom = await ChatRoom.findByPk(id_chatroom, {
            include: [Message, Suscription, ChatRoomSetting],
        })

        return res.status(200).json(findChatRoom)
    } catch (error) {
        return res.status(400).json(error)
    }
})

router.post('/:id_user/createGroupChat', async (req:Request, res:Response)=>{
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
            role: "Admin"
        })

        return res.status(200).json(newChatRoom)
    } catch (error) {
        return res.status(400).json(error)
    }
})

router.delete('/:id_chatroom', async (req:Request, res:Response)=>{
    try {
        const {id_chatroom} = req.params
        const findAll = await ChatRoom.destroy({ where:{id:id_chatroom} })

        return res.status(200).json(findAll)
    } catch (error) {
        return res.status(400).json(error)
    }
})

router.put('/:id_chatroom/modifyChatRoomSetting', async (req:Request, res:Response)=>{
    try {
        const {id_chatroom} = req.params
        const {category, description, name, privacy} = req.body as ChatRoomSettingAttributes

        type ChatRoomSettingsUpdateAttributers = {
            category?: string[]
            description?: string
            name?: string
            privacy?: 'private' | 'public'
        }
        const parameter:ChatRoomSettingsUpdateAttributers  = {}
        if(name) parameter.name = name
        if(privacy) parameter.privacy = privacy
        if(category) parameter.category = category
        if(description) parameter.description = description

        const updateChatRoomSetting = await ChatRoomSetting.update(parameter, { where:{id_chatroom} })

        return res.status(200).json(updateChatRoomSetting)
    } catch (error) {
        return res.status(400).json(error)
    }
})

//---------------------------------------------------------------------------------------

router.post('/:id_user/sendMessage', async (req:Request, res:Response)=>{
    try {
        const {id_user} = req.params
        const { id_chatroom, content } = req.body as MessageCreateAttributes
        
        const newMessage = await Message.create({content, id_chatroom, id_user})

        return res.status(200).json(newMessage)
    } catch (error) {
        return res.status(400).json(error)
    }
})

router.put('/:id_user/modifyMessage/:id_message', async (req:Request, res:Response)=>{
    try {
        const {id_message} = req.params
        const {content} = req.body
        
        const updateMessage = await Message.update({content}, { where:{id: id_message} })

        return res.status(200).json(updateMessage)
    } catch (error) {
        return res.status(400).json(error)
    }
})

router.delete('/:id_user/deleteMessage/:id_message', async (req:Request, res:Response)=>{
    try {
        const {id_message} = req.params
        
        const deleteMessage = await Message.destroy( {where:{id: id_message}} )

        return res.status(200).json(deleteMessage)
    } catch (error) {
        return res.status(400).json(error)
    }
})

export default router