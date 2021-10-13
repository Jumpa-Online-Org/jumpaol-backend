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

exports.findAll = (req, res) => {
    const { q, page, size, status } = req.query
    let condition = q ? { post_title: {[Op.like]: `%${q}%`} } : null
    let filterPostStatus = status ? { post_status: status } : null

    const { limit, offset } = getPagination(page, size)

    Post.findAndCountAll({ where: {...condition, ...filterPostStatus, post_type: 'post'}, limit, offset })
        .then(data => {
            const response = getPagingData(data, page, limit)

            res.send({
                status: 200,
                message: "success fetch data!",
                data: response
            })
        })
        .catch(err => {
            res.status(400).send({
                message: err.message
            })
        })

};

exports.findOne = async (req, res) => {
    const id = req.params.id
    let body = {
        views: 0
    }

    const getPrevViews = await Post.findByPk(id, {
        attributes: ['views']
    })

    body.views = getPrevViews?.views + 1

    Post.update(body, {
        where: {
            id: id
        }
    }).then(d => {
        Post.findByPk(id)
            .then(data => {
                res.send({
                    status: 200,
                    message: "success fetch data!",
                    data: data
                })
            })
            .catch(err => {
                res.status(400).send({
                    message: err.message
                });
            });
    }).catch(err => console.log(err))
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
        res.send({
            status: 200,
            message: "success updated data!",
            data: body
        })
    }).catch(err => {
        res.status(400).send({
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
        res.send({
            status: 200,
            message: "success delete data!",
            data: body
        })
    }).catch(err => {
        res.status(400).send({
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

            res.send({
                status: 200,
                message: "success fetch data!",
                data: response
            })
        })
        .catch(err => {
            res.status(400).send({
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
        res.send({
            status: 200,
            message: "success delete data!",
            data: {id}        })
    }).catch(err => {
        res.status(400).send({
            message: err.message
        })
    })
};

exports.detail = async (req, res) => {
    const id = req.params.id

    Post.findByPk(id)
        .then(data => {
            res.send({
                status: 200,
                message: "success fetch data!",
                data: data
            })
        })
        .catch(err => {
            res.status(400).send({
                message: err.message
            });
        });
};