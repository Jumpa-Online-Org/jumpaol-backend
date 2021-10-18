const db = require('../models')
const User = db.users

module.exports = {
    register: async (req, res) => {
        const body = req.body

        try{
            const create = await User.create(body)

            if(create){
                return res.send({
                    status: 200,
                    message: "User has been registered!",
                    data: body
                })
            }
        }catch(err){
            return res.status(500).send({
                status: 500,
                message: err,
                data: []
            }) 
        }
    }
}