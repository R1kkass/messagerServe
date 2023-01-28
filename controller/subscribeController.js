const { User, Subscriber } = require("../models/model")
const ApiError = require("../error/ApiError")
const {Op} = require('sequelize')
const sequelize = require('../db')

class SubscribeController{
    async create(req, res, next){
        try{
        let {userId, subscribeId} = req.body
        const device = await Subscriber.findOne({where: {
            [Op.and]: [{ userId}, { subscribeId }],
        }})

        

        let device3;
        
        if(device){
            console.log(device);
            return res.json({message: 'error'})
        }
        console.log(device3);
        device3 = await Subscriber.create({userId, subscribeId})
        return res.json({device3})
    } catch (e){
        return ApiError.badRequest(e.message)
    }}
    
    async getAll(req, res, next){
        try{
        const {subscribeId} = req.query
        const device = await Subscriber.findAll({where: {subscribeId}, include: {all:true}})
        return res.json({device})
    } catch (e){
        return ApiError.badRequest(e.message)
    }}

    async getAllReverse(req, res, next){
        try{
        const {userId} = req.query
        
        const subs = sequelize.query(`SELECT "subscriber"."id", "subscriber"."userId", "subscriber"."subscribeId", "subscriber"."createdAt", "subscriber"."updatedAt", "user"."id" AS "user.id", "user"."email" AS "user.email", "user"."name" AS "user.name", "user"."password" AS "user.password", "user"."role" AS "user.role", "user"."img" AS "user.img", "user"."createdAt" AS "user.createdAt", "user"."updatedAt" AS "user.updatedAt" FROM "subscribers" AS "subscriber" LEFT OUTER JOIN "users" AS "user" ON "subscriber"."subscribeId" = "user"."id" WHERE "subscriber"."userId" = '1';`)
        let subss =await subs
        return res.json({subss})
    } catch (e){
        return ApiError.badRequest(e.message)
    }}

    async getOne(req, res, next){
        try{
        const {userId, subscribeId} = req.query
        const device = await Subscriber.findOne({where: {
            [Op.and]: [{ userId }, { subscribeId }],
        }})

        if(device){
            return res.json({message: true})
        }

        return res.json({message: false})
    } catch (e){
        return ApiError.badRequest(e.message)
    }}

    async delete(req, res, next){
        try{
        const {userId, subscribeId} = req.body

        const device = await Subscriber.destroy({where: {
            [Op.and]: [{ userId }, { subscribeId }],
        }})

        return res.json({message: true})
    } catch (e){
        return ApiError.badRequest(e.message)
    }}
}

module.exports = new SubscribeController