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
db.category = require('./category.model')(seq, Sequelize)
db.subCategory = require('./subCategory.model')(seq, Sequelize)

db.posts.belongsTo(db.users, {
    foreignKey: "post_author",
    as: "author"
})

db.category.hasMany(db.subCategory, { 
    foreignKey: "category_id", 
    as: 'sub_categories'
})

db.subCategory.belongsTo(db.category, {
    foreignKey: "category_id",
    as: 'category'
})

module.exports = db