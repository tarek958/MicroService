const User = require('../models/user.model');

// Follow a user
exports.followUser = async (req, res) => {
  try {
    const { userId } = req.user; // Authenticated user ID
    const { followId } = req.params; // ID of the user to follow

    const user = await User.findById(userId);
    const followUser = await User.findById(followId);

    if (!followUser) {
      return res.status(404).json({ error: 'User to follow not found' });
    }

    if (!user.following.includes(followId)) {
      user.following.push(followId);
      await user.save();
    }

    if (!followUser.followers.includes(userId)) {
      followUser.followers.push(userId);
      await followUser.save();
    }

    res.status(200).json({ message: 'User followed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to follow user' });
  }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
  try {
    const { userId } = req.user; // Authenticated user ID
    const { unfollowId } = req.params; // ID of the user to unfollow

    const user = await User.findById(userId);
    const unfollowUser = await User.findById(unfollowId);

    if (!unfollowUser) {
      return res.status(404).json({ error: 'User to unfollow not found' });
    }

    user.following = user.following.filter(id => id !== unfollowId);
    unfollowUser.followers = unfollowUser.followers.filter(id => id !== userId);

    await user.save();
    await unfollowUser.save();

    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to unfollow user' });
  }
};
