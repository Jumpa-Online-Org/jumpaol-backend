module.exports = (seq, Sequelize) => {
    const SubCategory = seq.define('wp_sub_categories', {
        name: {
            type: Sequelize.STRING
        },
        category_id: {
            type: Sequelize.INTEGER
        },
        created_at: {
            type: Sequelize.DATE
        },
        updated_at: {
            type: Sequelize.DATE
        }
    })

    return SubCategory
}