const Router = require('express')
const router = new Router()
const userController = require('../controller/userController')
const authMiddleware = require('../middleware/authMiddleware')
const authMiddlewareCheck = require('../middleware/authMiddlewareCheckMy')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.post('/authcheck', authMiddlewareCheck)
router.post('/getone', userController.getOne)
router.get('/getall', userController.getAll)

module.exports=router