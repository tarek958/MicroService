const User = require('../models/user.model'); // Ensure this path is correct
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const {
      email,
      password,
      username,
      userType,
      firstName,
      lastName,
      phoneNumber,
      gender,
      dateOfBirth,
      country,
      userImage,
      companyImage,
      documents
    } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user with the optional fields
    const user = new User({
      email,
      password: hashedPassword,
      username,
      userType,
      firstName,
      lastName,
      phoneNumber,
      gender,
      dateOfBirth,
      country,
      userImage,
      companyImage,
      documents
    });
    
    await user.save(); // Save the user to the database
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ error: 'User registration failed', err });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1h' }); // Use user._id for Mongoose
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};



exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};


exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body }; // Spread the request body to create updatedData

    // Check if password is included in the updated data
    if (updatedData.password) {
      // Hash the new password
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user', err });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
