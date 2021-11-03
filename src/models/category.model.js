module.exports = (seq, Sequelize) => {
    const Category = seq.define('wp_categories', {
        name: {
            type: Sequelize.STRING
        },
        created_at: {
            type: Sequelize.DATE
        },
        updated_at: {
            type: Sequelize.DATE
        }
    })

    return Category
}