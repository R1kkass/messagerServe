const ApiError = require("../error/ApiError")
const bcrypt = require("bcrypt")
const {User, Chat, Comment, Feed, Img} = require('../models/model')
const jwt = require('jsonwebtoken')
const {Op} = require('sequelize')
const uuid = require('uuid')
const path = require('path')

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
        const {id, limit} = req.query
        if(id){
            console.log('tut');
            feed = await Feed.findAndCountAll({where: {userId: id},
                include:[
                    {
                        model: Img
                    },
                    {
                        model: User
                    },
                    {
                        model:Comment,
                        limit: 2,
                        include: User
                    }
                ],
                limit: limit || 10,
                order: [["id","DESC"]]
            })
        }else{
            feed = await Feed.findAndCountAll({
                include:[
                    {
                        model: Img
                    },
                    {
                        model: User
                    },
                    {
                        model:Comment,
                        limit: 2,
                        include: User
                    }],
                limit: limit || 10,
                order: [["id","DESC"]]
            },
            )
        }
        return res.json({feed})
        }catch(e){
            return ApiError.badRequest(e.message)
        }
    }
}

module.exports = new FeedController()