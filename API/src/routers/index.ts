import { Router } from "express";
import UserRouter from './user.router'
import ChatRoomRouter from './chatroom.router'

const router = Router()

router.use('/user', UserRouter)
router.use('/chatroom', ChatRoomRouter)

// router.use('/chatRoom')

export default router;