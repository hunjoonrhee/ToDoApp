const User = require('../models/user');
const bcrpyt = require('bcrypt');

const userController = {};

userController.createUser = async (req, res) => {
  const { email, password, username } = req.body;
  const exUser = await User.findOne({ email: email });
  if (exUser) {
    return res.status(403).send('already used email.');
  }
  const hashPassword = await bcrpyt.hash(password, 13);

  const newUser = new User({ email, password: hashPassword, username });
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error by saving new user', err });
  }
};

userController.loginWithEmail = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }, '-__v -createdAt -updatedAt');

  if (!user) {
    return res.status(403).send('user email does not exist!');
  }
  const isMatched = await bcrpyt.compareSync(password, user.password);
  if (!isMatched) {
    return res.status(403).send('wrong password');
  }
  try {
    const token = user.generateToken();
    return res.status(200).json({ status: 'success', user, token });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error by logging in', err });
  }
};

module.exports = userController;