var express = require('express');
const User = require('../model/user');
var router = express.Router();

/* GET users listing. */
router.get('/', async (_, res) => {
  try {
    const users = await User.query();
    res.send(users);
  } catch (e) {
    res.status(500);
    res.send({ message: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  let user;

  try {
    user = await User.query().findById(id);
  } catch (e) {
    res.status(500);
    res.send({ message: 'Internal server error' });
  }

  if (!user) {
    res.status(404);
    res.send({ message: 'Not found' });
  }

  res.send(user);
});

router.post('/', async (req, res) => {
  const body = req.body;

  if (body && body.id) {
    res.status(400);
    res.send({ message: "New user shouldn't have an id" });
  }

  let user;

  try {
    user = await User.query().insert(body);
  } catch (e) {
    res.status(e.statusCode);
    res.send(e);
  }

  res.status(201);
  res.send(user);
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  let user = await User.query().findById(id);
  if (!user) {
    res.status(404);
    res.send({ message: 'Not found' });
  }

  try {
    const body = req.body;
    user = await User.query().update(body);
  } catch (e) {
    res.status(400);
    res.send(e);
  }

  res.status(200);
  res.send(user);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await User.query().deleteById(id);
  } catch (e) {
    res.status(500);
    res.send({ message: 'Internal server error' });
  }
  res.status(203);
  res.end();
});

module.exports = router;
