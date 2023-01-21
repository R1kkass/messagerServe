const userController = require('../controller/userController');
const { User } = require('../models/model');
const ApiError = require("../error/ApiError")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role, img, name) => {
    return jwt.sign(
        {id, email, role, img, name},
        'code',
        {expiresIn: '24h'}
    )
}

const root = {
    getAllUser: async ()=>{
        const user = await User.findAll({})
        return user
    }, 

    createUser: async ({input})=>{
        const {email, password, firstName, lastName, role} = input
        if (!email || !password || !firstName || !lastName) {
            return ApiError.badRequest('Некорректный данные')
        }
        const candidate = await User.findOne({where: {email: email}})
        if (candidate) {
            return ApiError.badRequest('Пользователь с таким email уже существует')
        }
        const hashPassword = await bcrypt.hash(password, 5)
        
        const user = await User.create({email, role: role || "User", password: hashPassword, name: firstName + ' ' + lastName})
        const token = generateJwt(user.id, user.email, user.role)
        return token
    },

    getOneUser: async ({id})=>{
        const user = await User.findOne({where:{id}})
        return user
    },
    
}



module.exports = root