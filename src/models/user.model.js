module.exports = (seq, Sequelize) => {
    const User = seq.define('wp_users', {
        user_login: {
            type: Sequelize.STRING
        },
        user_pass: {
            type: Sequelize.STRING
        },
        user_nicename: {
            type: Sequelize.STRING
        },
        user_email: {
            type: Sequelize.STRING
        },
        user_registered: {
            type: Sequelize.DATE
        },
        user_activation_key: {
            type: Sequelize.STRING
        },
        user_status: {
            type: Sequelize.INTEGER
        },
        display_name: {
            type: Sequelize.STRING
        },
        birth_place: {
            type: Sequelize.STRING
        },
        birth_date: {
            type: Sequelize.DATE
        },
        jurusan_kuliah: {
            type: Sequelize.STRING
        },
        divisi: {
            type: Sequelize.STRING
        },
        jabatan: {
            type: Sequelize.STRING
        },
        motto_hidup: {
            type: Sequelize.TEXT
        },
        foto: {
            type: Sequelize.TEXT
        },
        level: {
            type: Sequelize.INTEGER
        }
    })

    return User
}