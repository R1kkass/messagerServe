const subscribeController = require('../controller/subscribeController')
const authMiddleware = require('../middleware/authMiddleware')
const Router = require('express')
const authMiddlewareCheck = require('../middleware/authMiddlewareCheckMys')
const router = new Router()

router.post('/create', authMiddlewareCheck, subscribeController.create)
router.get('/getall', authMiddlewareCheck, subscribeController.getAll)
router.get('/getone', authMiddlewareCheck, subscribeController.getOne)
router.post('/delete', authMiddlewareCheck, subscribeController.delete)

module.exports=router