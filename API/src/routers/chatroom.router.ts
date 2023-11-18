import { Router } from "express";
import { deleteMessage, modifyMessage, sendMessage } from "../controllers/message.controller";
import { banUserToChatRoom, createChatRoomGroup, deleteChatRoomGroup, findAllChatRoom, findOneChatRoom, inviteUserToChatRoom } from "../controllers/chatroom.controller";
import { modifyChatRoomSetting } from "../controllers/chatroomSetting.controller";
import { roleAdminAuthorization, roleAdminModAuthorization, validateSuscription, verifyMessageSender, verifyPrivacyAndBlackList } from "../middleware";
import { modifyRoleUser } from "../controllers/suscription.controller";


const router = Router()

router.get('/', findAllChatRoom)

router.get('/:id_chatroom', findOneChatRoom)

router.post('/:id_user/createGroupChat', createChatRoomGroup)

router.delete('/:id_suscription/deleteGroupChat/:id_chatroom', validateSuscription, roleAdminAuthorization, deleteChatRoomGroup)

//---------------------------------------------------------------------------------------

router.put('/:id_suscription/modifyChatRoomSetting/:id_chatroom', validateSuscription, roleAdminModAuthorization, modifyChatRoomSetting)

//---------------------------------------------------------------------------------------

// Aca van las rutas para enviar invitaciones y para expulsar usuarios
router.post('/:id_suscription/inviteFriendToChatRoom/:id_friend', validateSuscription, verifyPrivacyAndBlackList, inviteUserToChatRoom)
router.put('/:id_suscribe/modifyRole/:id_friend', validateSuscription, roleAdminModAuthorization, modifyRoleUser)
router.delete('/:id_suscription/banUserToChatRoom/:id_friend', validateSuscription, roleAdminModAuthorization, banUserToChatRoom)

// DeleteUserBan
// DeleteUserInvite
//---------------------------------------------------------------------------------------

router.post('/:id_suscription/sendMessage', validateSuscription, sendMessage)
router.put('/:id_suscription/modifyMessage/:id_message', validateSuscription, verifyMessageSender, modifyMessage)
router.delete('/:id_suscription/deleteMessage/:id_message', validateSuscription, verifyMessageSender, deleteMessage)

//---------------------------------------------------------------------------------------

export default router