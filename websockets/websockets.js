
const {Message, Chat} = require("../models/model")

class WebSock{
    async delete(id, user, idRoom){
        try{
        const msg = await Message.destroy({where: {id, user} })
        const g =await Message.findOne({where: {idRoom: idRoom}, order: [["id","DESC"]]})
        console.log(g);
        await Chat.update({lastMessage: g.text || '', lastUser: g.user || '', lastId: g.id},{where: {idRoom: idRoom}})
        return (msg)
        }catch(e){
            console.log(e);
        }
    }
}

module.exports = new WebSock()