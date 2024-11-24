const User = require("../models/User");

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
