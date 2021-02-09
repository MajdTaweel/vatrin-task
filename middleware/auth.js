const jwt = require('jsonwebtoken');
const config = require('config');
const { refreshToken } = require('../util/jwt');

exports.verify = (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    return res.status(403).send();
  }

  token = JSON.parse(req.cookies.token);

  const jwtConfig = config.get('jwt');

  if (!token.accessToken) {
    return res.status(403).send();
  }

  try {
    jwt.verify(token.accessToken, jwtConfig.accessToken.secret);
    next();
  } catch (_) {
    try {
      jwt.verify(token.refreshToken, jwtConfig.refreshToken.secret);
      token = refreshToken(token);
      res.cookie('token', token, { secure: true, httpOnly: true });
      next();
    } catch (e) {
      return res.status(401).send();
    }
  }
};
