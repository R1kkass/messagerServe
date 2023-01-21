const Router = require('express')
const router = new Router()
const commentController = require('../controller/commentController')
const authMiddleware = require('../middleware/authMiddleware')
const authMiddlewareCheck = require('../middleware/authMiddlewareCheckMy')

router.post('/create', commentController.create)
router.get('/getall', commentController.getAll)

module.exports=router