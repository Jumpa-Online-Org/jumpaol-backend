const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;
const { getPagination, getPagingData } = require('../../helper')

exports.create = (req, res) => {
    const body = {
        ...req.body,
        post_date: new Date(),
        post_date_gmt: new Date(),
        post_modified: new Date(),
        post_modified_gmt: new Date()
    }

    Post.create(body)
        .then(data => {
            res.send({
                status: 200,
                message: "success create data!",
                data: body
            })
        }).catch(err => {
            res.status(400).send({
                message: err.message
            })
        })
};

exports.findAll = async (req, res) => {
    const { q, page, status, per_page, category_id, latest, popular } = req.query
    let condition = q ? { post_title: {[Op.like]: `%${q}%`} } : null
    let filterPostStatus = status ? { post_status: status } : null
    let filterCategory = category_id ? { category_id: category_id } : null

    const { limit, offset } = getPagination(page, per_page)

    try{
        const data = await Post.findAndCountAll({
            include: ["author", "category"],
            where: {
                ...condition, 
                ...filterPostStatus,
                ...filterCategory,
                post_type: 'post',
                deleted_at: null
            },
            order: [(latest ? ['post_date', 'DESC'] : ['post_date', 'ASC']), ['id', 'DESC'], (popular ? ['views', 'DESC'] : ['views', 'ASC'])],
            limit,
            offset
        })

        if(!data){
            return res.status(404).send({
                status: 404,
                message: "Data not found!",
                data: []
            })
        }

        return res.send({
            status: 200,
            message: "Success fetch data!",
            data: getPagingData(data, page, limit)
        })
    }catch(err) {
        return res.status(500).send({
            status: 500,
            message: err.parent.sqlMessage,
            data: []
        })
    }

};

exports.findOne = async (req, res) => {
    const id = req.params.id
    let body = {
        views: 0
    }

    try{
        const getPrevViews = await Post.findByPk(id, {
            attributes: ['views']
        })

        body.views = getPrevViews?.views + 1

        const updateView = await Post.update(body, {
            where: {
                id: id
            }
        })

        if(updateView){
            const postByPK = await Post.findByPk(id)

            if(!postByPK){
                return res.status(404).send({
                    status: 404,
                    message: "Data Not Found!",
                    data: []
                })
            }

            return res.send({
                status: 200,
                message: "Success fetch data!",
                data: postByPK
            })
        }
    }catch(err){
        return res.status(500).send({
            status: 500,
            message: "Opps something wrong!",
            data: []
        })
    }
};

exports.update = (req, res) => {
    const id = req.params.id
    let body = {
        ...req.body,
        post_modified: new Date(),
        post_modified_gmt: new Date()
    }

    Post.update(body, {
        where: {
            id: id
        }
    }).then(data => {
        return res.send({
            status: 200,
            message: "success updated data!",
            data: body
        })
    }).catch(err => {
        return res.status(400).send({
            message: err.message
        })
    })
};

exports.deleteTemporary = (req, res) => {
    const id = req.params.id
    let body = {
        deleted_at: new Date()
    }

    Post.update(body, {
        where: {
            id: id
        }
    }).then(data => {
        return res.send({
            status: 200,
            message: "success delete data!",
            data: body
        })
    }).catch(err => {
        return res.status(400).send({
            message: err.message
        })
    })
};

exports.getDeletedPosts = (req, res) => {
    const { q, page, size } = req.query
    let condition = q ? { post_title: {[Op.like]: `%${q}%`} } : null

    const { limit, offset } = getPagination(page, size)

    Post.findAndCountAll({ where: {...condition, deleted_at: { [Op.not]: null }}, limit, offset })
        .then(data => {
            const response = getPagingData(data, page, limit)

            return res.send({
                status: 200,
                message: "success fetch data!",
                data: response
            })
        })
        .catch(err => {
            return res.status(400).send({
                message: err.message
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id

    Post.destroy({
        where: {
            id: id
        }
    }).then(data => {
        return res.send({
            status: 200,
            message: "success delete data!",
            data: {id}        })
    }).catch(err => {
        return res.status(400).send({
            message: err.message
        })
    })
};

exports.detail = async (req, res) => {
    const id = req.params.id

    try{
        const data = await Post.findByPk(id)

        if(!data){
            return res.status(404).send({
                status: 404,
                message: "Data not found",
                data: []
            })
        }

        return res.send({
            status: 200,
            message: "Success fetch data!",
            data: data
        })

    }catch(err){
        return res.status(400).send({
            message: err.message,
            data: []
        })
    }
};

exports.popular = async (req, res) => {
    try {
        const data = await Post.findAll({
            include: ["author", "category"],
            where: {
                post_status: 'publish',
                post_type: 'post',
                deleted_at: null
            },
            order: [['views', 'DESC']],
            limit: 4
        })

        if (!data) {
            return res.status(404).send({
                status: 404,
                message: "Data not found",
                data: []
            })
        }

        return res.send({
            status: 200,
            message: "Success fetch data!",
            data: data
        })
    } catch (err) {
        return res.status(400).send({
            message: err.message,
            data: []
        })
    }
}

exports.latest = async (req, res) => {
    try {
        const data = await Post.findAll({
            include: ["author", "category"],
            where: {
                post_status: 'publish',
                post_type: 'post',
                deleted_at: null
            },
            order: [['post_date', 'DESC']],
            limit: 3
        })

        if (!data) {
            return res.status(404).send({
                status: 404,
                message: "Data not found",
                data: []
            })
        }

        return res.send({
            status: 200,
            message: "Success fetch data!",
            data: data
        })
    } catch (err) {
        return res.status(400).send({
            message: err.message,
            data: []
        })
    }
}