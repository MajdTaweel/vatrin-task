const express = require('express');
const router = express.Router();
const User = require('../model/user');
const { encodePassword, comparePassword } = require('../util/password-encoder');
const { generateToken } = require('../util/jwt');

router.post('/login', async (req, res, next) => {
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
  res.send(user);
});

router.post('/register', async (req, res, next) => {
  const body = req.body;

  if (body && body.id) {
    res.status(400);
    res.send({ message: "New user shouldn't have an id" });
  }

  let user;

  try {
    if (body.password) {
      body.password = await encodePassword(body.password);
    }

    user = await User.query().insert(body);
  } catch (err) {
    if (err.statusCode === 400) {
      res.status(err.statusCode);
      res.send(e);
    } else {
      next(err);
    }
  }

  let payload = { username: user.username };

  const token = generateToken(payload);

  res.cookie('token', token, {
    secure: true,
    httpOnly: true,
  });
  res.send(user);
});

module.exports = router;
