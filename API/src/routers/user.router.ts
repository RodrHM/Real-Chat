import { Request, Response, Router } from 'express'
import User from '../models/User'
import Message from '../models/Message'
import NotificationMessage from '../models/NotificationMessage'
import { SuscriptionCreationAttributes, UserAttributes, UserCreationAttributes } from '../customTypes/typesModels'
import Suscription from '../models/Suscription'

const router = Router()

router.get('/', async (_req:Request, res:Response)=>{
    try {
        const findUsers = await User.findAll({include:[Message, Suscription]}) 

        return res.status(200).json(findUsers)
    } catch (error) {
        return res.status(400).json(error)
    }
})

router.get('/:id', async (req:Request, res:Response)=>{
    try {
        const {id} = req.params
        const findUser = await User.findByPk(id, {
            include:[
                { model:Message },
                { model:Suscription}
            ]
        }) 

        return res.status(200).json(findUser)
    } catch (error) {
        return res.status(400).json(error)
    }
})

router.post('/', async (req:Request, res:Response)=>{
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
})

router.put('/:id', async (req:Request, res:Response)=>{
    try {
        const { id } = req.params
        const {username, description, image} = req.body as UserAttributes

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
})

router.delete('/:id', async (req:Request, res:Response)=>{
    try {
        const { id } = req.params
        const deleteUser = await User.destroy({ where:{id} })

        return res.status(200).json(deleteUser)
    } catch (error) {
        return res.status(400).json(error)
    }
})

//-----------------------------------------------------------------------

router.post('/:id_user/notification', async (req:Request, res:Response)=>{
    try {
        const { id_user } = req.params
        const { content } = req.body
        const newNotidication = await NotificationMessage.create({ id_user: id_user, content })
        
        return res.status(200).json(newNotidication)
    } catch (error) {
        return res.status(400).json(error)
    }
})

router.delete('/:id_not/notification', async (req:Request, res:Response)=>{
    try {
        const { id_not } = req.params
        const deleteNotidication = await NotificationMessage.destroy({where:{id:id_not}})
        
        return res.status(200).json(deleteNotidication)
    } catch (error) {
        return res.status(400).json(error)
    }
})

//-----------------------------------------------------------------------

router.post('/:id_user/suscribe', async (req:Request, res:Response) => {
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
})

router.put('/:id_suscribe/modifyRole', async (req:Request, res:Response) => {
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
})

router.delete('/:id_suscribe/unsuscribe', async (req:Request, res:Response) => {
    try {
        const {id_suscribe} = req.params
        const suscription = await Suscription.destroy({ where: {id: id_suscribe} })

        return res.status(200).json(suscription)
    } catch (error) {
        return res.status(400).json(error)
    }
})

//-----------------------------------------------------------------------

export default router