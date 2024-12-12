const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("req.body: ", req.body);
  const hashedPassword = await bcrypt.hash(password, 10); // to be studied
  //The purpose of the cost factor is to make it computationally expensive for attackers
  // to brute-force or guess the hashed passwords, even if they have access to the hashed values.
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: "User created..." });
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
};
