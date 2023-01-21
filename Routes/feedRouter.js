const Router = require('express')
const router = new Router()
const feedController = require('../controller/feedController')
const authMiddleware = require('../middleware/authMiddleware')
const authMiddlewareCheck = require('../middleware/authMiddlewareCheckMy')

router.post('/create', authMiddleware, feedController.create)
router.get('/getAll', feedController.getAll)

module.exports=router