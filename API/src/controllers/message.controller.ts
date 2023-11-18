import { Request, Response } from "express"
import { MessageCreateAttributes } from "../customTypes/typesModels"
import Message from "../models/Message"


export async function sendMessage(req:Request, res:Response){
    try {
        // const {id_user} = req.params
        const { id_user, id_chatroom, content } = req.body as MessageCreateAttributes
        
        const newMessage = await Message.create({content, id_chatroom, id_user})

        return res.status(200).json(newMessage)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export async function modifyMessage(req:Request, res:Response){
    try {
        const {id_message} = req.params
        const {content} = req.body
        
        const updateMessage = await Message.update({content}, { where:{id: id_message} })

        return res.status(200).json(updateMessage)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export async function deleteMessage(req:Request, res:Response){
    try {
        const {id_message} = req.params
        
        const deleteMessage = await Message.destroy( {where:{id: id_message}} )

        return res.status(200).json(deleteMessage)
    } catch (error) {
        return res.status(400).json(error)
    }
}