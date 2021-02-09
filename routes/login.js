const express = require('express');
const router = express.Router();
const User = require('../model/user');
const { comparePassword } = require('../util/password-encoder');
const { generateToken } = require('../util/jwt');

router.get('/', (req, res, next) => {
  res.render('login');
});

router.post('/', async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  let user;

  try {
    user = await User.query().findOne({ username });
  } catch (err) {
    next(err);
  }

  if (!user || !user.password) {
    res.status(401).send({ message: 'Incorrect username or password' });
  }

  if (!comparePassword(password, user.password)) {
    res.status(401).send({ message: 'Incorrect username or password' });
  }

  let payload = { username };

  const token = generateToken(payload);

  res.cookie('token', token, {
    secure: true,
    httpOnly: true,
  });
  res.render('profile', { user });
});

module.exports = router;
