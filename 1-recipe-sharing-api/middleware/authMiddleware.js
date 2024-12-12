const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log("Auth MW token: ", token);
  console.log("Auth MW req.headers: ", req.headers);

  /**This line attempts to extract the JWT from the Authorization header of the incoming request.
   *  The token is expected to be in the format Bearer <token>,
   * so it splits the string and takes the second part (the actual token). */
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    /**If the token is successfully verified, this line fetches the user from the database using the ID extracted
     *  from the decoded token
     *  and attaches the user object to the req object for use in subsequent middleware or route handlers. */
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
