const mongoose = require("mongoose");
const Joi = require("joi");
// defining  Schema
const userSchema = new mongoose.Schema({
  updated: { type: Date, default: Date.now },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 44,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
});
// User model
const User = mongoose.model("User", userSchema);
// User validation
const userValidate = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(44).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required(),
  });
  return schema.validate(user);
};

module.exports = { User, userValidate };
