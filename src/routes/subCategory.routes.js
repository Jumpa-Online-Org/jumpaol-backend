module.exports = app => {
    const subCategories = require("../controllers/subCategory.controller.js");

    var router = require("express").Router();

    router.post("/add", subCategories.create);
    router.get("/", subCategories.findAll)
    router.put("/:id", subCategories.update)
    router.delete("/:id", subCategories.delete)

    //prefix route
    app.use('/api/sub-categories', router)
}