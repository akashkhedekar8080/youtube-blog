require("dotenv").config();
const express = require("express");
const { connectToMongoDb } = require("./connect");
const cookieParser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");
const app = express();
const PORT = process.env.PORT || 8000;
const path = require("path");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const staticRoute = require("./routes/static");

//view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectToMongoDb(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDb connected!");
  })
  .catch((error) => {
    console.log("Error: Failed connect MongoDb ", error);
  });

//middlware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));
app.use(checkForAuthenticationCookie("token"));

//route
app.use("/", staticRoute);
app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
  console.log("Server started at port: " + PORT);
});
