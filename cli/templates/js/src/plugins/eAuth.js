const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const bcrypt = require("bcrypt");

function eAuth({ enova, res, req }) {
  let eAuth = {};
  const storeToken = ({ payload, secret, expiresIn }) => {
    const token = jwt.sign(
      {
        data: payload,
      },
      secret,
      { expiresIn: expiresIn }
    );
    const cookieOptions = {
      maxAge: expiresIn,
      httpOnly: true,
      path: "/",
    };
    const cookieString = cookie.serialize("token", token, cookieOptions);
    res.setHeader("Set-Cookie", cookieString);
  };
  const removeToken = () => {
    const cookieOptions = {
      maxAge: 0,
      httpOnly: true,
      path: "/",
    };
    const cookieString = cookie.serialize("token", "", cookieOptions);
    res.setHeader("Set-Cookie", cookieString);
  };

  const getDecodedToken = (secret) => {
    try {
      return jwt.verify(cookie.parse(req.headers.cookie || "").token, secret);
    } catch (err) {
      return false;
    }
  };
  const getRawToken = () => {
    return cookie.parse(req.headers.cookie || "").token;
  };

  const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
  };

  const verifyPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
  };
  eAuth.storeToken = storeToken;
  eAuth.removeToken = removeToken;
  eAuth.getDecodedToken = getDecodedToken;
  eAuth.getRawToken = getRawToken;
  eAuth.hashPassword = hashPassword;
  eAuth.verifyPassword = verifyPassword;
  enova.eAuth = eAuth;
}

module.exports = eAuth;
