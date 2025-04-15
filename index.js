const express = require("express");
const app = express();
const PORT = 8000;
const path = require("path");
const useRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middleware/authentication");

mongoose
  .connect("mongodb://localhost:27017/blogApp")
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const Blog = require("./model/blog");

app.use(express.urlencoded({ extended: false }));
app.use("/user", useRoute);
app.use("/blog", blogRoute);
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
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
