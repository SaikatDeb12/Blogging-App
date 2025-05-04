require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const path = require("path");
const useRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middleware/authentication");
const Blog = require("./model/blog");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(cookieParser());
// the middleware checkForAuthenticationCookie needs to access the cookie before parsing
app.use(checkForAuthenticationCookie("token"));
app.use(express.urlencoded({ extended: false }));
app.use("/user", useRoute);
app.use("/blog", blogRoute);
app.use(express.static(path.resolve("./public"))); //to load static images

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({}).sort();
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.listen(PORT, () => console.log(`server started at ${PORT}`));

//abc@gmail.com
//1234
