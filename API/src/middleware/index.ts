import { NextFunction, Request, Response } from "express"
import Suscription from "../models/Suscription"
import Message from "../models/Message"
import ChatRoom from "../models/Chatroom"
import ChatRoomSetting from "../models/ChatRoomSetting"

export async function roleAdminAuthorization(req:Request, res:Response, next:NextFunction){
    try {
        const { id_suscription } = req.params
        
        const suscription = await Suscription.findByPk(id_suscription)

        if(suscription?.role !== 'Admin') throw new Error('No tienes el rango nesesario para realizar esta accion')  

        return next();
    } catch (error) {
        return res.status(400).json(error)
    }
}

export async function roleAdminModAuthorization(req:Request, res:Response, next:NextFunction){
    try {
        const { id_suscription } = req.params
        
        const suscription = await Suscription.findByPk(id_suscription)

        if(suscription?.role === 'User') throw new Error('No tienes el rango nesesario para realizar esta accion')  

        return next();
    } catch (error) {
        return res.status(400).json(error)
    }
}

export async function validateSuscription(req:Request, res:Response, next:NextFunction){
    try {
        const { id_suscription } = req.params
        
        const suscription = await Suscription.findByPk(id_suscription)

        if(!suscription) throw new Error('Suscripcion invalida')  

        req.body.id_chatroom = suscription.id_chatroom
        req.body.id_user = suscription.id_user

        return next();
    } catch (error) {
        return res.status(400).json(error)
    }
}

export async function verifyMessageSender(req:Request, res:Response, next:NextFunction){
    try {
        const { id_message } = req.params
        const { id_chatroom, id_user} = req.body
        
        const findMessage = await Message.findOne(
            {where:{id_user, id_chatroom}}
        )

        if(!findMessage) throw new Error('Mensaje no encontrado');
        if(findMessage.id !== id_message) throw new Error('El mensaje no corresponde a tu usuario');
        
        return next();
    } catch (error) {
        return res.status(400).json(error)
    }
}

export async function verifyPrivacyAndBlackList(req:Request, res:Response, next:NextFunction){
    try {
        const {id_friend} = req.params
        const {id_chatroom} = req.body

        const chatroom = await ChatRoom.findByPk(id_chatroom)
        const findUserInBlackList = chatroom?.blacklist.some(id => id===id_friend )
        if(findUserInBlackList) throw new Error('No es posible agregar a esta persona porque esta en la Lista Negra');
        
        const chatroomsettings = await ChatRoomSetting.findOne({where:{id_chatroom}})

        if(chatroomsettings?.privacy==='Public') return res.status(200).json({id_chatroom})

        return next()
    } catch (error) {
        return res.status(400).json(error)
    }
}

export async function verifyPrivacyAndWishList(req:Request, res:Response, next:NextFunction){
    try {
        const { id_friend } = req.params
        const {id_chatroom} = req.body
        
        const chatroomsettings = await ChatRoomSetting.findOne({where:{id_chatroom}})

        if(chatroomsettings?.privacy==='Public') return res.status(200).json({id_chatroom})

        const chatroom = await ChatRoom.findByPk(id_chatroom)
        const verifyWishlist = chatroom?.wishlist.some(id => id===id_friend)
        if(verifyWishlist) return next()
    } catch (error) {
        return res.status(400).json(error)
    }
}