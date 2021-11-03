module.exports = app => {
    const categories = require("../controllers/category.controller.js");

    var router = require("express").Router();

    router.post("/add", categories.create);
    router.get("/", categories.findAll)
    router.put("/:id", categories.update)
    router.delete("/:id", categories.delete)

    //prefix route
    app.use('/api/categories', router)
}