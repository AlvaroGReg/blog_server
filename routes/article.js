const express = require("express")
const router = express.Router()
const ArticleController = require("../controlers/article")

//Test routes
router.get("/test", ArticleController.test)
router.get("/course", ArticleController.course)

//Util route
router.post("/create", ArticleController.create)
router.get("/articles/:lasts?", ArticleController.list)


module.exports = router