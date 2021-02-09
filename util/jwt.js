const jwt = require('jsonwebtoken');
const config = require('config');

const generateToken = (payload) => {
  const jwtConfig = config.get('jwt');

  const access = jwt.sign(payload, jwtConfig.accessToken.secret, {
    algorithm: 'HS256',
    expiresIn: jwtConfig.accessToken.expiresIn,
  });

  const refresh = jwt.sign(payload, jwtConfig.refreshToken.secret, {
    algorithm: 'HS256',
    expiresIn: jwtConfig.refreshToken.expiresIn,
  });

  return JSON.stringify({ accessToken: access, refreshToken: refresh });
};

const refreshToken = (token) => {
  const decodedToken = jwt.decode(token.refreshToken);
  const payload = { username: decodedToken.username };

  return generateToken(payload);
};

const getUsername = (token) => {
  const decodedToken = jwt.decode(token.accessToken);

  return decodedToken.username;
};

module.exports = { generateToken, refreshToken, getUsername };
