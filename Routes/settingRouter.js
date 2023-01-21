const Router = require('express')
const router = new Router()
const settingController = require('../controller/settingController')
const authMiddleware = require('../middleware/authMiddleware')
const authMiddlewareCheck = require('../middleware/authMiddlewareCheckMy')

router.post('/create', settingController.create)

module.exports=router