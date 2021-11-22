const { User, userValidate } = require("../models/User");

const getUsers = async (req, res) => {
  const users = await User.find().sort("name");
  res.status(200).send(users);
};
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, msg: `no person with id ${id}` });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createUser = async (req, res) => {
  const user = new User({ ...req.body });
  const { error } = userValidate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { error } = userValidate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { ...req.body } },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, msg: `no person with id ${id}` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, msg: `no person with id ${id}` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
