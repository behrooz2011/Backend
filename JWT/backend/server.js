// const express = require("express");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// // Enable CORS for all routes
// app.use(
//   cors({
//     origin: "http://localhost:3000", // Allow requests from this origin
//   })
// );

// app.use(bodyParser.json());

// const SECRET_KEY = "your_secret_key"; // Use environment variables in production!
// const users = []; // Simulated database

// // Register endpoint
// app.post("/register", async (req, res) => {
//   const { username, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   users.push({ username, password: hashedPassword });
//   console.log(users);
//   return res.status(201).send({ message: "User registered!" });
// });

// // Login endpoint
// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find((u) => u.username === username);

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).send({ message: "Invalid credentials" });
//   }

//   const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
//   res.send({ token });
// });

// // Protected endpoint
// app.get("/profile", (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(403).send({ message: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, SECRET_KEY);
//     res.send({ message: `Hello, ${decoded.username}!` });
//   } catch (error) {
//     res.status(401).send({ message: "Invalid token" });
//   }
// });

// app.listen(3001, () => console.log("Server running on port 3001"));
///////////////////////////////////////////////////////////////////////////////

//Required dependencies
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = 5000;
const JWT_SECRET = "your-secret-key"; // In production, use environment variable

// Middleware
app.use(express.json());
app.use(cors());

// In-memory user storage (use a real database in production)
const users = [];

// Register endpoint
app.post("/api/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    if (users.find((user) => user.email === email)) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user
    users.push({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
});

// Login endpoint
app.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate token
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

// Protected route middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

// Protected route example
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is protected data", user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
