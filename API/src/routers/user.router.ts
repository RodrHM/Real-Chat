import { Router } from 'express'
import { createUser, deleteUser, findAllUsers, findOneUser, modifyUser } from '../controllers/user.controller'
import { createNotificationMessage, deleteNotidicationMessage } from '../controllers/nofidicationMessage.controller'
import { suscribeChatRoom, unsuscribeChatRoom } from '../controllers/suscription.controller'
import { authenticateUserToken, validateSuscription } from '../middlewares'

const router = Router()

// integrar tokens como contraseña y verificar
// CRUD DEL USUARIO
router.get('/', findAllUsers)
router.get('/:id', authenticateUserToken, findOneUser)
router.post('/', createUser)
router.put('/:id', authenticateUserToken, modifyUser)
router.delete('/:id', authenticateUserToken, deleteUser)

//-----------------------------------------------------------------------
// 
router.post('/:id_user/notification/:id_friend', authenticateUserToken, createNotificationMessage)
router.delete('/:id_user/notification/:id_not', authenticateUserToken, deleteNotidicationMessage)

//-----------------------------------------------------------------------
// Rutas para que el usuario se suscriba y se desuscriba
router.post('/:id_user/suscribe/:id_chatroom', authenticateUserToken, suscribeChatRoom)
router.delete('/:id_suscribe/unsuscribe', validateSuscription, unsuscribeChatRoom)

//-----------------------------------------------------------------------

export default router