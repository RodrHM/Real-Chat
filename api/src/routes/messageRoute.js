const express = require('express')
const { getChatRoomMessage, createMessage, modifyMessage, deleteMessage } = require('../controllers/message')

const router = express.Router()

router.get('/charRoom/:id', getChatRoomMessage)

router.post('/', createMessage)

router.put('/content/:id', modifyMessage)

router.delete('/:id', deleteMessage)

module.exports = router