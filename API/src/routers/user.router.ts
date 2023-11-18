import { Router } from 'express'
import { createUser, deleteUser, findAllUsers, findOneUser, modifyUser } from '../controllers/user.controller'
import { createNotificationMessage, deleteNotidicationMessage } from '../controllers/nofidicationMessage.controller'
import { modifyRoleUser, suscribeChatRoom, unsuscribeChatRoom } from '../controllers/suscription.controller'

const router = Router()

// integrar tokens como contraseña y verificar
router.get('/', findAllUsers)

router.get('/:id', findOneUser)

router.post('/', createUser)

router.put('/:id', modifyUser)

router.delete('/:id', deleteUser)

//-----------------------------------------------------------------------

router.post('/:id_user/notification', createNotificationMessage)

router.delete('/:id_user/notification/:id_not', deleteNotidicationMessage)

//-----------------------------------------------------------------------

router.post('/:id_user/suscribe', suscribeChatRoom)

router.put('/:id_suscribe/modifyRole', modifyRoleUser)

router.delete('/:id_suscribe/unsuscribe', unsuscribeChatRoom)

//-----------------------------------------------------------------------

export default router