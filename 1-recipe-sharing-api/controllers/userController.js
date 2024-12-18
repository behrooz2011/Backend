const User = require("../models/User");

//Get all the users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Fetch all users and exclude the password field
    res.json(users); // Send the list of users as a JSON response
  } catch (error) {
    console.error("Error fetching users: ", error.message);
    res.status(500).json({ message: "Server error" }); // Handle any errors that occur
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
  /**.select("-password"): This part specifies that the query should return
   * all fields of the user document except for the password field.
   *  The - sign before password indicates that this field should be excluded from the result. */
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  const { username, email } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { username, email },
    { new: true }
  );
  res.json(user);
  /**{ new: true }:
   * This option tells Mongoose to return the updated document rather
   *  than the original document before the update. */
};

// Follow another user
exports.followUser = async (req, res) => {
  const userToFollow = await User.findById(req.params.userId);
  if (!userToFollow) {
    return res.status(404).json({ message: "User not found" });
  }
  const user = await User.findById(req.user.id);
  if (!user.followings.includes(userToFollow._id)) {
    user.followings.push(userToFollow._id);
    await user.save();
  }
  res.json(user);
};
