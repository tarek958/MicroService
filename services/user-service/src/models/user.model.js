const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  id: {
    type: String,
    default: () => new mongoose.Types.ObjectId(),
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
  phoneNumber: String,
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  dateOfBirth: Date,
  country: String,
  userImage: String,
  companyImage: String,
  documents: [String],
  userType: {
    type: String,
    enum: ['admin', 'user', 'super_user'],
    required: true,
  },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
