import { Request, Response } from "express"
import { SuscriptionCreationAttributes } from "../customTypes/typesModels"
import Suscription from "../models/Suscription"

export async function suscribeChatRoom(req:Request, res:Response){
    try {
        const { id_user } = req.params
        const { id_chatroom } = req.body as SuscriptionCreationAttributes

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
        const {id_suscribe} = req.params
        const {role} = req.body

        const suscription = await Suscription.update(
            {role},
            { where: {id: id_suscribe} }
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