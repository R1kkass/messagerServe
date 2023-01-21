const models = require('../models/model')
const ws = require('ws')
const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const wss = WSServer.getWss()
const WebSock = require("./websockets")

function wsCall(message){
    message = JSON.parse(message)
    switch(message.event){
        case "connection": 
            ws.id = message.id
            console.log(ws.id);
            broadcastMessage(message)
            break
        case "message":
            addMessage(message)
            broadcastMessage(message)
            break
        case "limit":
            broadcastMessage(message)
            break
        case "delete":
            WebSock.delete(message.idDelete, message.user)
            broadcastMessage(message)
            break
    }
}

async function addMessage(message){
    const msg  = await models.Message.create({user: message.username, text: message.text, idRoom: message.id, event: message.event})
}

async function query(id, message){
    let page = 1
    let limit = message.limit
    let offset = limit*page-limit
    
    const msg = await models.Message.findAndCountAll({where: {idRoom: id}, limit, offset, order: [["id","ASC"]]})
    .then((m)=>{
        return(m)
    })
    return(msg);
}


async function broadcastMessage(message, id){
    limit =  message.limit || 10
    page = 1
    offset = page * limit - limit
    
    wss.clients.forEach((client)=>{
        query(client.id || 0, message)
        .then((e)=>client.send(JSON.stringify(e)))
    })
}


module.exports = {
    wsCall
}