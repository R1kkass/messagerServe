const {User, Message, Chat} = require('../models/model')
const {Op} = require('sequelize')

class WebSocketController{

async addMessage(message){
    const msg  = await Message.create({user: message.username, text: message.text, idRoom: message.id, event: message.event})
    await Chat.update({lastMessage: message.text, 
        lastUser: message.username, lastId: msg.id},
        {where: {idRoom: message.id}})
}

async query(id, message){
    try{
        console.log(id);
        let page = 1
        let limit = message.limit
        let offset = limit*page-limit
        
        const msg = await Message.findAndCountAll({where: {idRoom: id}, 
            limit, offset, order: [["id","DESC"]]})
        .then((m)=>{
            return(m)
        })
        return(msg);
    }catch(e){
       console.log(e); 
    }
    }

async queryChats(email){
    try{     
        const msg = await Chat.findAll({where:  {[Op.or]: [{ userCreator: email }, { secondUser: email }]}})
        .then((m)=>{
            return(m)
        })
        return(msg);
    }catch(e){
       console.log(e); 
    }
    }

}

module.exports = new WebSocketController