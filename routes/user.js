const { Router } = require("express");
const router = Router();
const User = require("../model/user");

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.matchPasswordAndGenerateToken(email, password);
  console.log("user", user);
  return res.redirect("/");
  // return res.status(200).json({ msg: "user logged in" });
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log(fullName);
  console.log(email);
  console.log(password);
  await User.create({ fullName, email, password });
  return res.redirect("/");
});

module.exports = router;
