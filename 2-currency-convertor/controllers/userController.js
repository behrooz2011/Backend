const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

// Signup controller
exports.signup = (req, res) => {
  console.log("--Signup --");

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Hash the password before saving
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error hashing password", error: err.message });
    }

    // Insert the user into the database
    db.run(
      `INSERT INTO users (email, password) VALUES (?, ?)`,
      [email, hash],
      function (err) {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error creating user", error: err.message });
        }
        res
          .status(201)
          .json({ message: "User created successfully", userId: this.lastID });
      }
    );
  });
};

// Login controller
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Fetch user from the database
  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching user", error: err.message });
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error comparing passwords", error: err.message });
      }

      if (!result) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({ message: "Login successful", token });
    });
  });
};
