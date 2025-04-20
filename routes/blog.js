const { Router } = require("express");
const router = Router();
const multer = require("multer");
const Blog = require("../model/blog");
const commentModel = require("../model/comment");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      `C:/Users/saika/OneDrive/Documents/studies_related/node_basics/blog-App-JWT/public/uploads`
    );
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/add-blog", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  const comments = await commentModel
    .find({ blogId: req.params.id })
    .populate("createdBy");
  console.log("comments: ", comments);
  return res.render("blog", {
    user: req.user,
    blog: blog,
    comments: comments,
  });
});

router.post("/comment/:blogId", async (req, res) => {
  await commentModel.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const { title, body } = req.body;
  const blog = await Blog.create({
    body,
    title,
    coverImgURL: `uploads/${req.file.filename}`,
  });
  return res.redirect(`blog/${blog._id}`);
});

module.exports = router;
