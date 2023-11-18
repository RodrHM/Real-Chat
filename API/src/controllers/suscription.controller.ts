import { Request, Response } from "express"
import { SuscriptionCreationAttributes } from "../customTypes/typesModels"
import Suscription from "../models/Suscription"

export async function suscribeChatRoom(req:Request, res:Response){
    try {
        const { id_user, id_chatroom } = req.params as SuscriptionCreationAttributes
        // const { id_chatroom } = req.body as SuscriptionCreationAttributes

        const newSuscription = await Suscription.create({
            id_chatroom,
            id_user,
            role: 'User'
        })

        return res.status(200).json(newSuscription)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export async function modifyRoleUser(req:Request, res:Response){
    try {
        const {id_friend} = req.params
        const {role, id_chatroom} = req.body

        const suscription = await Suscription.update(
            {role},
            { where: {id_user:id_friend, id_chatroom} }
        )

        return res.status(200).json(suscription)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export async function unsuscribeChatRoom(req:Request, res:Response){
    try {
        const {id_suscribe} = req.params
        const suscription = await Suscription.destroy({ where: {id: id_suscribe} })

        return res.status(200).json(suscription)
    } catch (error) {
        return res.status(400).json(error)
    }
}