const express = require('express');
const { verify } = require('../middleware/auth');
const User = require('../model/user');
const { encodePassword } = require('../util/password-encoder');
const router = express.Router();

router.use(verify);

/* GET users listing. */
router.get('/', async (_, res, next) => {
  try {
    const users = await User.query();
    res.send(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  let user;

  try {
    user = await User.query().findById(id);
  } catch (err) {
    next(err);
  }

  if (!user) {
    res.status(404);
    res.send({ message: 'Not found' });
  }

  res.send(user);
});

router.post('/', async (req, res, next) => {
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

  res.status(201);
  res.send(user);
});

router.put('/:id', async (req, res, next) => {
  const id = req.params.id;
  let user = await User.query().findById(id);

  if (!user) {
    next({ status: 404, message: 'Not found' });
  }

  try {
    const body = req.body;
    user = await User.query().update(body);
  } catch (err) {
    if (err.statusCode === 400) {
      res.status(err.statusCode);
      res.send(err);
    } else {
      next(err);
    }
  }

  res.status(200);
  res.send(user);
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    await User.query().deleteById(id);
  } catch (err) {
    next(err);
  }
  res.sendStatus(204);
});

module.exports = router;
