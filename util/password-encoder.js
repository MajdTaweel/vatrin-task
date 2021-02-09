const bcrypt = require('bcrypt');

const encodePassword = async (plaintextPassword) => {
  const saltRounds = 10;

  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(plaintextPassword, salt);
};

const comparePassword = async (plaintextPassword, hash) => {
  bcrypt.compare(plaintextPassword, hash);
};

module.exports = { encodePassword, comparePassword };
