module.exports = (seq, Sequelize) => {
    const Post = seq.define('wp_posts', {
        post_author: {
            type: Sequelize.INTEGER
        },
        post_date: {
            type: Sequelize.DATE
        },
        post_date_gmt: {
            type: Sequelize.DATE
        },
        post_content: {
            type: Sequelize.TEXT
        },
        post_title: {
            type: Sequelize.STRING
        },
        post_excerpt: {
            type: Sequelize.TEXT('medium')
        },
        to_ping: {
            type: Sequelize.TEXT('medium'),
            defaultValue: ""
        },
        pinged: {
            type: Sequelize.TEXT('medium'),
            defaultValue: ""
        },
        post_content_filtered: {
            type: Sequelize.TEXT('long'),
            defaultValue: ""
        },
        post_status: {
            type: Sequelize.STRING
        },
        comment_status: {
            type: Sequelize.STRING
        },
        ping_status: {
            type: Sequelize.STRING
        },
        post_password: {
            type: Sequelize.TEXT
        },
        post_name: {
            type: Sequelize.STRING
        },
        post_modified: {
            type: Sequelize.DATE
        },
        post_modified_gmt: {
            type: Sequelize.DATE
        },
        post_parent: {
            type: Sequelize.INTEGER
        },
        guid: {
            type: Sequelize.STRING
        },
        menu_order: {
            type: Sequelize.INTEGER
        },
        post_type: {
            type: Sequelize.STRING
        },
        post_mime_type: {
            type: Sequelize.STRING
        },
        comment_count: {
            type: Sequelize.INTEGER
        },
        views: {
            type: Sequelize.BIGINT
        },
        deleted_at: {
            type: Sequelize.DATE
        },
        category_id: {
            type: Sequelize.INTEGER
        },
        sub_category_id: {
            type: Sequelize.INTEGER
        }
    })

    return Post
}