import { Request, Response } from "express"
import User from "../models/User"
import Message from "../models/Message"
import Suscription from "../models/Suscription"
import { UserCreationAttributes } from "../customTypes/typesModels"

export async function findAllUsers(_req:Request, res:Response){
    try {
        const findUsers = await User.findAll({include:[Message, Suscription]}) 

        return res.status(200).json(findUsers)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export async function findOneUser(req:Request, res:Response){
    try {
        const {id} = req.params
        const findUser = await User.findByPk(id, {
            include:[ { model:Message }, { model:Suscription} ]
        }) 

        return res.status(200).json(findUser)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export async function createUser (req:Request, res:Response){
    try {
        const {username, email} = req.body as UserCreationAttributes
        const newUser = new User({ username, email })
        console.log(newUser)
        await newUser.save()
        console.log(Object.getPrototypeOf(newUser))

        
        return res.status(200).json(newUser)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export async function modifyUser(req:Request, res:Response){
    try {
        const { id } = req.params
        const {username, description, image} = req.body as UserModifyAttributes

        type UserModifyAttributes = {
            username?: string, 
            description?: string, 
            image?: string
        }
        const properties:UserModifyAttributes = {}
        if(username) properties.username = username
        if(description) properties.description = description
        if(image) properties.image = image

        const updateUser = await User.update(properties, {where:{id}})
        
        return res.status(200).json(updateUser)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export async function deleteUser(req:Request, res:Response){
    try {
        const { id } = req.params
        const deleteUser = await User.destroy({ where:{id} })

        return res.status(200).json(deleteUser)
    } catch (error) {
        return res.status(400).json(error)
    }
}

// export async function name(params:type) {
    
// }