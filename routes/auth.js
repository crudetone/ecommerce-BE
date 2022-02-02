const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log("---user---: ", user);
    if (!user) {
      return res.status(401).json("Wrong credentials");
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    );
    const userPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (userPassword !== req.body.password) {
      return res.status(401).json("Wrong credentials");
    }

    const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    const { password, ...rest } = user._doc;
    console.log("rest: ", rest);
    console.log("accessToken: ", accessToken);
    res.status(200).json({ ...rest, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
