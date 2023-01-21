const { User, Subscriber } = require("../models/model")
const ApiError = require("../error/ApiError")
const {Op} = require('sequelize')

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