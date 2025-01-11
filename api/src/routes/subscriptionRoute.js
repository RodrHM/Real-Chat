const express = require('express')
const { getSubscription, getUserSubscription, getChatRoomSubscription, createSubscription, modifyRoleSubscription, deleteSubscription } = require('../controllers/subscription')

const router = express.Router()

router.get('/:id', getSubscription)

router.get('/user/:id', getUserSubscription)

router.get('/chatRoom/:id', getChatRoomSubscription)

router.post('/', createSubscription)

router.put('/:id', modifyRoleSubscription)

router.delete('/:id', deleteSubscription)

module.exports = router