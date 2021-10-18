const db = require('./src/models')
const User = db.users

module.exports = {
    getPagination: (page, size) => {
        const limit = size ? +size : 10
        const offset = page ? page * limit : 0

        return { limit, offset }
    },
    getPagingData: (datas, page, limit) => {
        const { count: total, rows: data } = datas
        const current_page = page ? +page : 1
        const total_pages = Math.ceil(total / limit)
        
        return { total, data, total_pages, current_page, per_page: limit }
    },
    checkEmailExist: async (req, res, next) => {
        try{
            const data = await User.findOne({
                where: {
                    user_email: req.body.user_email
                }
            })
    
            if(!data){
                next()
            }
    
            return res.status(400).send({
                status: 400,
                message: "Failed! Email is already in use!"
            });
        }catch(err){
            throw err;
        }
    }
}