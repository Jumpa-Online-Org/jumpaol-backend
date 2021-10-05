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
    }
}