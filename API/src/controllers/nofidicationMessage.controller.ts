import { Request, Response } from "express"
import NotificationMessage from "../models/NotificationMessage"
import { NotificationMessageCreationAttributes } from "../customTypes/typesModels"

export async function createNotificationMessage(req:Request, res:Response){
    try {
        const { /*id_user,*/ id_friend } = req.params
        const { content, additionalData } = req.body as NotificationMessageCreationAttributes

        const newNotidication = await NotificationMessage.create({ id_user: id_friend, content , additionalData})
        
        return res.status(200).json(newNotidication)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export async function deleteNotidicationMessage(req:Request, res:Response){
    try {
        const { id_not } = req.params
        const deleteNotidication = await NotificationMessage.destroy({where:{id:id_not}})
        
        return res.status(200).json(deleteNotidication)
    } catch (error) {
        return res.status(400).json(error)
    }
}
