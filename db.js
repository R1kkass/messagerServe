const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    'Messager',
    'postgres',
    "25122004",
    {
        dialect: 'postgres',
        host: 'localhost',
        port: 5000 
    }
)