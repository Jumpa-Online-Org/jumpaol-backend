module.exports = app => {
    const posts = require("../controllers/post.controller.js");

    var router = require("express").Router();

    router.get("/", posts.findAll);
    router.get("/:id", posts.findOne);
    router.get("/deleted/lists", posts.getDeletedPosts);
    router.put("/:id", posts.update);
    router.post("/", posts.create);
    router.put("/delete-temporary/:id", posts.deleteTemporary);
    router.delete("/delete/:id", posts.delete);

    app.use('/api/posts', router)
}