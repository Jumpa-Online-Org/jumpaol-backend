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
db.users = require('./user.model')(seq, Sequelize)

db.posts.belongsTo(db.users, {
    foreignKey: "post_author",
    as: "author"
})

module.exports = db