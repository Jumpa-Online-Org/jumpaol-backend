const db = require("../models")
const Validator = require('validatorjs')
const SubCategory = db.subCategory
const Op = db.Sequelize.Op
const { getPagination, getPagingData} = require ('../../helper')

module.exports = {
    create: async (req, res) => {
        const body = req.body
        const rules = {
            name: 'required',
            category_id: 'required|numeric'
        }
        const validation = new Validator(body, rules, {
            "required.name": "Nama kategori tidak boleh kosong",
            "required.category_id": "Parent kategori tidak boleh kosong",
            "numeric.category_id": "Parent kategori harus berupa angka"
        })

        try{
            if(validation.fails()){
                return res.status(400).send({
                    status: 400,
                    message: "Periksa kembali form",
                    data: validation.errors.all()
                })
            }

            const data = await SubCategory.create(body)
            if(data){
                return res.send({
                    status: 200,
                    message: "Success add data!",
                    data: body
                })
            }
        }catch(err){
            return res.status(500).send({
                status: 500,
                message: err.parent.sqlMessage,
                data: []
            })
        }
    },
    findAll: async (req, res) => {
        const { q, page, per_page } = req.query
        let search = q ? { name: {[Op.like]: `%${q}%`} } : null

        const { limit, offset } = getPagination(page, per_page)

        try{
            const data = await SubCategory.findAndCountAll({
                include: ['category'],
                where: search,
                order: [['created_at', 'DESC'], ['id', 'DESC']],
                limit,
                offset
            })

            return res.send({
                status: 200,
                message: "Success fetch data!",
                data: getPagingData(data, page, limit)
            })
        }catch(err){
            console.log(err)
            return res.status(500).send({
                status: 500,
                message: err.parent.sqlMessage,
                data: []
            })
        }
    },
    update: async (req, res) => {
        const body = req.body
        const id = req.params.id
        const rules = {
            name: 'required',
            category_id: 'required|numeric'
        }
        const validation = new Validator(body, rules, {
            "required.name": "Nama kategori tidak boleh kosong",
            "required.name": "Nama kategori tidak boleh kosong",
            "required.category_id": "Parent kategori tidak boleh kosong",
            "numeric.category_id": "Parent kategori harus berupa angka"
        })

        try{
            if(validation.fails()){
                return res.status(400).send({
                    status: 400,
                    message: "Periksa kembali form",
                    data: validation.errors.all()
                })
            }

            await SubCategory.update(body, {
                where: { id: id}
            })

            return res.send({
                status: 200,
                message: "success updated data!",
                data: body
            })
        }catch(err) {
            throw err
        }
    },
    delete: async (req, res) => {
        const id = req.params.id

        try{
            await SubCategory.destroy({
                where: { id: id }
            })

            return res.send({
                status: 200,
                message: "success delete data!",
                data: {id}
            })
        }catch(err){
            throw err
        }
    }
}