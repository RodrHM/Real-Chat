const {Router} = require('express')
const userRouter = require('./userRoute')
const subscriptionRoute = require('./subscriptionRoute')
const chatRoomRoute = require('./chatRoomRoute')
const messageRoute = require('./messageRoute')

const router = Router()

router.use('/user', userRouter)
router.use('/subscriptionRoute', subscriptionRoute)
router.use('/chatRoomRoute', chatRoomRoute)
router.use('/messageRoute', messageRoute)

module.exports = router