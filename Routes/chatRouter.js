const Router = require('express')
const router = new Router()
const chatController = require('../controller/chatController')
const authMiddleware = require('../middleware/authMiddleware')
const authMiddlewareCheck = require('../middleware/authMiddlewareCheckMy')

router.post('/create', chatController.create)
router.get('/getall', chatController.getAll)
router.get('/getone', chatController.getOne)

module.exports=router