import { Router } from "express";
import UserRouter from './user.router'
import MessageRouter from './message.router'
import ChatRoomRouter from './chatroom.router'

const router = Router()

router.use('/user', UserRouter)
router.use('/message', MessageRouter)
router.use('/chatroom', ChatRoomRouter)

// router.use('/chatRoom')

export default router;