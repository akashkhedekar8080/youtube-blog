const COMMENT = require("../models/comment");

async function handleAddComment(req, res) {
  try {
    const { content } = req.body;
    const { blogId } = req.params;

    if (!content) {
      return res
        .status(400)
        .render(`/blog/${blogId}`, { error: "All fields are required" });
    }
    const comment = await COMMENT.create({
      content,
      blogId: blogId,
      createdBy: req.user ? req.user._id : null,
    });
    console.log(comment);
    if (!comment) {
      return res
        .status(500)
        .render(`/blog/${blogId}`, { error: "Comment creation failed" });
    }
    return res.status(302).redirect(`/blog/${blogId}`);
  } catch (error) {
    return res.status(500).render(`/blog/${blogId}`, {
      message: "Internal server error at comment creation.",
      error: error.message,
    });
  }
}

module.exports = { handleAddComment };
