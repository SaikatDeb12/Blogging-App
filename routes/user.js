const { Router } = require("express");
const router = Router();
const User = require("../model/user");

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/", (req, res) => {
  return res.render("home");
  // res.send("Welcome to home page");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    console.log("user", token);
    return res.cookie("token", token).redirect("/");
  } catch (err) {
    return res.render("signin", {
      error: "Invalid email or passsword",
    });
  }
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
