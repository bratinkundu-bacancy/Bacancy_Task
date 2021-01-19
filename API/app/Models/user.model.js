const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  mobileNo: {
    type: Number,
    required: true,
  },
  designation: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  }
});

userSchema.index({'$**': 'text'});
const User = new mongoose.model("User", userSchema);

module.exports = User;