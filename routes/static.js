const { Router } = require("express");
const { handleGetAllBlog } = require("../controllers/blog");
const router = Router();
router.route("/").get(handleGetAllBlog);

module.exports = router;
