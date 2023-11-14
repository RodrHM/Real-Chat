import { Request, Response, Router } from 'express'
import Message from '../models/Message'
import User from '../models/User'

const router = Router()

router.get('/', async (_req:Request, res:Response)=>{
    try {
        const findMessage = await Message.findAll({include:{ model:User }}) 

        return res.status(200).json(findMessage)
    } catch (error) {
        return res.status(400).json(error)
    }
})

router.get('/:id', async (req:Request, res:Response)=>{
    try {
        const {id} = req.params
        const findMessage = await Message.findByPk(id, {
            include:{ model:User }
        }) 

        return res.status(200).json(findMessage)
    } catch (error) {
        return res.status(400).json(error)
    }
})

router.post('/', async (req:Request, res:Response)=>{
    try {
        const { id_user, id_chatroom, content } = req.body
        const newMessage = await Message.create({ id_user, id_chatroom, content }, {
            include:{ model:User }
        })

        return res.status(200).json(newMessage)
    } catch (error) {
        return res.status(400).json(error)
    }
})

router.delete('/:id', async (req:Request, res:Response)=>{
    try {
        const { id } = req.params
        const deleteUser = await Message.destroy({ where:{id} })

        return res.status(200).json(deleteUser)
    } catch (error) {
        return res.status(400).json(error)
    }
})

export default router