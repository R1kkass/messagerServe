const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Message = sequelize.define('message', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user: {type: DataTypes.STRING},
    text: {type: DataTypes.STRING},
    idRoom: {type: DataTypes.STRING},
    event: {type: DataTypes.STRING}
})

const Chat = sequelize.define('chats',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userCreator:{type: DataTypes.STRING},
    secondUser: {type: DataTypes.STRING},
    userCreatorId:{type: DataTypes.STRING},
    secondUserId: {type: DataTypes.STRING},
    users: {type: DataTypes.STRING, unique: true},
    idRoom: {type: DataTypes.STRING},
    lastMessage: {type: DataTypes.STRING, defaultValue: ''},
    lastUser: {type: DataTypes.STRING, defaultValue: ''},
    lastId: {type: DataTypes.STRING},
})


const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    name:{type: DataTypes.STRING, defaultValue: 'none'},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    img:{type: DataTypes.STRING, defaultValue: 'none'},
})

const Feed = sequelize.define('feed', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER},
    text: {type: DataTypes.TEXT,},
    likes: {type: DataTypes.INTEGER, defaultValue: 0},
})

const Img = sequelize.define('img', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    feedId: {type: DataTypes.INTEGER},
    fileName: {type: DataTypes.STRING}
})

const Comment = sequelize.define('comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    feedId: {type: DataTypes.INTEGER},
    text: {type: DataTypes.STRING},
    userId: {type: DataTypes.INTEGER}
})

const Subscriber = sequelize.define('subscriber', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER},
    subscribeId: {type: DataTypes.INTEGER},
})

const Likes = sequelize.define('likes', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER},
    postId: {type: DataTypes.STRING}

})

User.hasMany(Likes)
Likes.belongsTo(User)

User.hasMany(Subscriber)
Subscriber.belongsTo(User)

Feed.hasMany(Img);
Img.belongsTo(Feed)

Feed.hasMany(Comment);
Comment.belongsTo(Feed)

User.hasMany(Feed);
Feed.belongsTo(User)

User.hasMany(Comment);
Comment.belongsTo(User)

module.exports={
    Message,
    User,
    Chat,
    Feed,
    Img, 
    Comment,
    Subscriber,
    Likes
}