const ApiError = require("../error/ApiError")
const bcrypt = require("bcrypt")
const {User, Chat, Message, Comment} = require('../models/model')
const jwt = require('jsonwebtoken')
const {Op} = require('sequelize')

class CommentController{
    async create(req, res){
        try{
            const {userName,userEmail,userId, text, feedId} = req.body
            console.log(userId, text, feedId);
            const response = await Comment.create({text,userId, feedId, userEmail, userName})
            return res.json({response:response})
        }catch(e){
            return ApiError.badRequest(e.message)
        }
    }

    async getAll(req, res){
        try{
        const {id} = req.query
        const comment = await Comment.findAll({where: {
            feedId: id
        },
        include: [User]
    })
        return res.json({comment})
        }catch(e){
            return ApiError.badRequest(e.message)
        }
    }
}

module.exports = new CommentController()