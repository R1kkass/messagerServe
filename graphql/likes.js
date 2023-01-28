const userController = require('../controller/userController');
const { User, Likes } = require('../models/model');
const ApiError = require("../error/ApiError")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const {Op} = require('sequelize')


const likes = {

    getAllLike: async ({ input }) => {
        const {postId} = input
        const like = await Likes.findAndCountAll({ where: { feedId: postId } })
        return like
    },

    getOneLike: async ({ input }) => {
        try{
        const {postId, userId} = input
        const like = await Likes.findOne({ where: { feedId: postId, userId } })
        return like
        }catch(e){
            return e
        }
    },

    createLike: async ({ input }) => {
        try{
        const { postId, userId } = input
        if (!postId || !userId) {
            return 'Некорректный данные'
        }
        const candidate = await Likes.findOne({ where: {
            [Op.and]: [{ userId }, { feedId: postId }],
        }})
        if (candidate) {
            return 'Like уже стоит'
        }
        const like = await Likes.create({ userId, feedId: postId })
        const likeCount = {}
        likeCount.id = await Likes.count({where: {feedId: postId}})
        return likeCount
    }catch(e){
        return e
    }
    },

    deleteOneLike: async ({ input }) => {
        const { postId, userId } = input
        if (!postId || !userId) {
            return 'Некорректный данные'
        }
        const candidate = await Likes.findOne({ where: {
            [Op.and]: [{ userId }, { feedId: postId }],
        }})
        if (candidate) {
            const like = await Likes.destroy({where: 
                {[Op.and]: [{userId}, {feedId: postId}]} 
            })
            const likeCount = {}
            likeCount.id = await Likes.count({where: {feedId: postId}})
            console.log(likeCount);
            return likeCount
        }
        return 'Ошибка'
    },
}


module.exports = likes