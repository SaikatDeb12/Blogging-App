const { Router } = require("express");
const router = Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      `C:/Users/saika/OneDrive/Documents/studies_related/node_basics/blog-App-JWT/public/uploads/`
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
    user: res.user,
  });
});

router.post("/", upload.single("coverImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.redirect("/");
});

module.exports = router;
