const express = require("express");
const app = express();
const PORT = 8000;
const path = require("path");
const useRoute = require("./routes/user");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/blogApp")
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// const Blog=require('./model/user')
// app.get("/", async(req, res) => {
//   const allBlogs
//   res.render("home");
// });

app.use(express.urlencoded({ extended: false }));

app.use("/user", useRoute);

app.listen(PORT, () => console.log(`server started at ${PORT}`));

//abc@gmail.com
//1234
