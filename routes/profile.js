const express = require('express');
const router = express.Router();
const { verify } = require('../middleware/auth');
const { getUsername } = require('../util/jwt');
const User = require('../model/user');

router.use(verify);

router.get('/', async (req, res) => {
  const token = JSON.parse(req.cookies.token);
  const username = getUsername(token);
  const user = await User.query().findOne({ username });

  res.render('profile', { user });
});

module.exports = router;
