const { Router } = require("express");
const upload = require("../services/upload");
const {
  handleAddBlog,
  handleGetBlogById,
  handleDeleteBlogById,
  handleUpdateBlogById,
  handleEditBlogById,
} = require("../controllers/blog");
const { handleAddComment } = require("../controllers/comment");
const router = Router();

router
  .route("/add-new")
  .get((req, res) => {
    return res.render("addBlog", { user: req.user });
  })
  .post(upload.single("coverImage"), handleAddBlog);
router.route("/:id").get(handleGetBlogById);
router
  .route("/edit/:id")
  .get(handleEditBlogById)
  .post(upload.single("coverImage"), handleUpdateBlogById);
router.route("/delete/:id").get(handleDeleteBlogById);
router.route("/comment/:blogId").post(handleAddComment);
module.exports = router;
