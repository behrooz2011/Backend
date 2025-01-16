const jwt = require("jsonwebtoken");
const db = require("../db");

// Find a user by ID
const findUserById = async (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(row);
    });
  });
};
const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log("Auth MW token: ", token);

  /**This line attempts to extract the JWT from the Authorization header of the incoming request.
   *  The token is expected to be in the format Bearer <token>,
   * so it splits the string and takes the second part (the actual token). */
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    //  JWT already created as follows:
    /* const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );*/
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded: ", decoded);

    req.user = await findUserById(decoded.userId);
    console.log("AUTH  req.user: ", req.user);
    /**If the token is successfully verified, this line fetches the user from the database using the ID extracted
     *  from the decoded token
     *  and attaches the user object to the req object for use in subsequent middleware or route handlers. */
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
