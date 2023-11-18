import { Request, Response } from "express"
import { ChatRoomSettingAttributes } from "../customTypes/typesModels"
import ChatRoomSetting from "../models/ChatRoomSetting"


export async function modifyChatRoomSetting(req:Request, res:Response){
    try {
        const {id_chatroom} = req.params
        const {category, description, name, privacy} = req.body as ChatRoomSettingAttributes

        type ChatRoomSettingsUpdateAttributers = {
            category?: string[]
            description?: string
            name?: string
            privacy?: 'Private' | 'Public'
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
}