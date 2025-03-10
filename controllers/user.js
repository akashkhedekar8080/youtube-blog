const USER = require("../models/user");

async function handleSignUp(req, res) {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res
        .status(400)
        .render("singnup", { error: "All fields are required" });
    }

    // Ensure email doesn't already exist
    const existingUser = await USER.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .render("singnup", { error: "Email already in use" });
    }

    // Creating user (ensure password hashing inside your model)
    const user = await USER.create({ fullName, email, password });

    return res.status(302).redirect("/");
  } catch (error) {
    return res.status(500).render("singnup", {
      message: "Internal server error at signup",
      error: error.message,
    });
  }
}

async function handleSignIn(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .render("signin", { error: "All fields are required" });
    }

    // Authenticate user
    const token = await USER.matchPasswordAndGenerateToken(email, password);
    if (!token) {
      return res
        .status(401)
        .render("signin", { error: "Invalid email or password" });
    }

    return res
      .cookie("token", token, { httpOnly: true, secure: true })
      .status(302)
      .redirect("/");
  } catch (error) {
    return res
      .status(401)
      .render("signin", { error: "Invalid email or password" });
  }
}

module.exports = { handleSignIn, handleSignUp };
