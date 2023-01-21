const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const chatRouter = require('./chatRouter')
const settingRouter = require('./settingRouter')
const feedRouter = require('./feedRouter')
const commentRouter = require('./commentRouter')
const subscriberRouter = require('./subscribeRouter')

router.use('/user', userRouter)
router.use('/chat', chatRouter)
router.use('/settinguser', settingRouter)
router.use('/feed', feedRouter)
router.use('/comment', commentRouter)
router.use('/sub', subscriberRouter)

module.exports=router