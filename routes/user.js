const { Router } = require("express");
const { handleSignIn, handleSignUp } = require("../controllers/user");
const router = Router();
router
  .route("/signin")
  .get((req, res) => {
    return res.render("signin");
  })
  .post(handleSignIn);
router
  .route("/signup")
  .get((req, res) => {
    return res.render("signup");
  })
  .post(handleSignUp);
router.get("/logout", (req, res) => {
  res.clearCookie("token").status(302).redirect("/");
});

module.exports = router;
