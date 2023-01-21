const ws = require('ws')
const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const wss = WSServer.getWss()

class NewsWebsocket{
    
    

    news(ws, req, message){
        message = JSON.parse(message)
        console.log('=========================================');
        switch(message.event){
            case "connectionNews": 
                ws.id = message.id
                ws.event=message.event
                fetchFeedNews(message)
                break
            case "newsAdd":
                fetchFeedNews(message)
                break
    }
}

    async fetchFeedNews(message){
    if(message.event !== 'connectionNews'){
        wss.clients.forEach((client)=>{
            client.send(JSON.stringify({message: true}))
        })
    }}

}   





module.exports=new NewsWebsocket