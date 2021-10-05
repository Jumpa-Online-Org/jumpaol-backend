const dbConfig = require('../config/db.config')

const Sequelize = require('sequelize')
const seq = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    define: {
        timestamps: false
    }
})

const db = {}

db.Sequelize = Sequelize
db.seq = seq

db.posts = require('./post.model.js')(seq, Sequelize)

module.exports = db