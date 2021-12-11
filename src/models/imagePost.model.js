module.exports = (seq, Sequelize) => {
    const ImagePost = seq.define('wp_posts', {
        post_parent: {
            type: Sequelize.INTEGER
        },
        post_type: {
            type: Sequelize.STRING
        },
        guid: {
            type: Sequelize.STRING
        }
    })

    return ImagePost
}