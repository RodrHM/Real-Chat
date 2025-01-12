const express = require('express')
const { getChatRoom, getUserChatRooms, createChatRoom, modifyChatRoom, addUserToChatRoom, deleteUserToChatRoom, deleteChatRoom } = require('../controllers/charRoom')

const router = express.Router()

router.get('/:id', getChatRoom)

router.get('/user/:id', getUserChatRooms)

router.post('/', createChatRoom)

router.put('/:id', modifyChatRoom)

router.put('/addUser/:id', addUserToChatRoom)

router.put('/deleteUser/:id', deleteUserToChatRoom)

router.delete('/:id', deleteChatRoom)

module.exports = router