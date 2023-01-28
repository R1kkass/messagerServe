const ApiError = require("../error/ApiError")
const bcrypt = require("bcrypt")
const {User, Chat, Comment, Feed, Img, Likes} = require('../models/model')
const jwt = require('jsonwebtoken')
const {Op} = require('sequelize')
const uuid = require('uuid')
const path = require('path')
const sequelize = require('../db')


class FeedController{
    async create(req, res, next){
        try{
            
            const {email, text} = req.body
            let imgs
            if(req.files?.imgs){
                imgs =req.files.imgs
            }
            
            if(!Array.isArray(imgs)){
                imgs = [imgs]
            }
            const token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, 'code')
            
            const user = await Feed.create({text, email, userId: email})
            if(imgs.length){
                for(let i = 0; i<imgs.length; i++){
                    const a = imgs[i].name.split('.')[1];
                    const fileName = uuid.v4() + "." + a
                    imgs[i].mv(path.resolve(__dirname, '..','static', fileName))
                    
                    const img = await Img.create({fileName: fileName, feedId: user.id})
                    console.log(email);
                }
            }
            
            return res.json({message: true})
        }catch(e){
            return ApiError.badRequest(e.message)
        }
    }

    async getAll(req, res){
        try{
        let feed
        let likes
        let comment
        const {id, limit} = req.query
        
        if(id){
            feed = await Feed.findAndCountAll({
                where: {userId: id},
                include:[
                    {
                        model: Img,
                        attributes: {exclude: ['createdAt', 'updatedAt']}
                    },
                    {
                        model: User,
                        attributes:{exclude: ['createdAt', 'updatedAt']}
                    },
                    {
                        model:Comment,
                        limit: 2,
                        include: User,
                        attributes: {exclude: ['createdAt', 'updatedAt']}
                    },

                ],
                limit: limit || 10,
                order: [["id","DESC"]]
            },
            )
            likes = await Likes.count({
                group:['likes.feedId']
            })
            comment=await Comment.count({
                group: ['comment.feedId']
            })
        }else{
            feed = await Feed.findAndCountAll({
                include:[
                    {
                        model: Img,
                        attributes: {exclude: ['createdAt', 'updatedAt']}
                    },
                    {
                        model: User,
                        attributes:{exclude: ['createdAt', 'updatedAt']}
                    },
                    {
                        model:Comment,
                        limit: 2,
                        include: User,
                        attributes: {exclude: ['createdAt', 'updatedAt']}
                    },

                ],
                limit: limit || 10,
                order: [["id","DESC"]]
            },
            )
            likes = await Likes.count({
                group:['likes.feedId']
            })
            comment=await Comment.count({
                group: ['comment.feedId']
            })
        }
        return res.json({feed, likes, comment})
        }catch(e){
            return ApiError.badRequest(e.message)
        }
    }
}

module.exports = new FeedController()