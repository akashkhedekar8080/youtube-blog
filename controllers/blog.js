const BLOG = require("../models/blog");
const COMMENT = require("../models/comment");

async function handleAddBlog(req, res) {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res
        .status(400)
        .render("addblog", { error: "All fields are required" });
    }

    const blogData = {
      title,
      body,
      createdBy: req.user ? req.user._id : null,
    };

    if (req.file) {
      blogData.coverImageURL = `/uploads/${req.file.filename}`;
    }

    const blog = await BLOG.create(blogData);

    if (!blog) {
      return res
        .status(500)
        .render("addblog", { error: "Blog creation failed" });
    }

    return res.status(302).redirect(`/blog/${blog._id}`);
  } catch (error) {
    console.error("Error in handleAddBlog:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function handleGetAllBlog(req, res) {
  try {
    const allBlogs = await BLOG.find({}).populate("createdBy");
    return res.render("home", { user: req.user, blogs: allBlogs });
  } catch (error) {
    console.error("Error in handleGetAllBlog:", error);
    return res.status(500).render("home", { error: "Internal Server Error" });
  }
}

async function handleGetBlogById(req, res) {
  try {
    const { id } = req.params;
    const blog = await BLOG.findById({ _id: id }).populate("createdBy");
    const comments = await COMMENT.find({ blogId: id }).populate("createdBy");

    if (!blog) {
      return res.status(404).render("blog", { error: "Blog not found" });
    }

    return res.render("blog", { user: req.user, blog, comments });
  } catch (error) {
    console.error("Error in handleGetBlogById:", error);
    return res.status(500).render("blog", { error: "Internal Server Error" });
  }
}

async function handleEditBlogById(req, res) {
  try {
    const { id } = req.params;
    const blog = await BLOG.findById({ _id: id }).populate("createdBy");

    if (!blog) {
      return res.status(404).render("addblog", { error: "Blog not found" });
    }

    if (blog.createdBy._id.toString() !== req.user._id.toString()) {
      return res.status(403).render("addblog", {
        error: "Forbidden - You don't have access to this resource",
      });
    }

    return res.render("addblog", { user: req.user, blog });
  } catch (error) {
    console.error("Error in handleEditBlogById:", error);
    return res
      .status(500)
      .render("addblog", { error: "Internal Server Error" });
  }
}

async function handleUpdateBlogById(req, res) {
  try {
    const { id } = req.params;
    const { title, body } = req.body;

    const blog = await BLOG.findById({ _id: id });

    if (!blog) {
      return res.status(404).render("addblog", { error: "Blog not found" });
    }

    if (blog.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).render("addblog", {
        error: "Forbidden - You don't have permission to edit this blog",
      });
    }
    console.log(blog);
    blog.title = title;
    blog.body = body;

    if (req.file) {
      blog.coverImageURL = `/uploads/${req.file.filename}`;
    }

    await blog.save();
    return res.redirect(`/`);
  } catch (error) {
    console.error("Error in handleUpdateBlogById:", error);
    return res
      .status(500)
      .render("addblog", { error: "Internal Server Error" });
  }
}

async function handleDeleteBlogById(req, res) {
  try {
    const { id } = req.params;
    const blog = await BLOG.findByIdAndDelete({ _id: id });

    if (!blog) {
      return res.status(404).render("home", { error: "Blog not found" });
    }

    await COMMENT.deleteMany({ blogId: id });

    return res.redirect("/");
  } catch (error) {
    console.error("Error in handleDeleteBlogById:", error);
    return res.status(500).render("home", { error: "Internal Server Error" });
  }
}

module.exports = {
  handleAddBlog,
  handleGetAllBlog,
  handleGetBlogById,
  handleEditBlogById,
  handleUpdateBlogById,
  handleDeleteBlogById,
};
