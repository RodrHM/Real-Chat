import { Request, Response } from "express"
import NotificationMessage from "../models/NotificationMessage"

export async function createNotificationMessage(req:Request, res:Response){
    try {
        const { id_user } = req.params
        const { content } = req.body
        const newNotidication = await NotificationMessage.create({ id_user: id_user, content })
        
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
