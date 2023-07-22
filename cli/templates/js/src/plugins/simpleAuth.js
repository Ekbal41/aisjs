const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const bcrypt = require("bcrypt");

function simpleAuth({ enova, res, req }) {
  let simpleAuth = {};

  simpleAuth.addToken = (payload, secret, expiresIn) => {
    const token = jwt.sign(
      {
        data: payload,
      },
      secret,
      { expiresIn: expiresIn }
    );
    const cookieOptions = {
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      httpOnly: true,
      path: "/",
    };
    const cookieString = cookie.serialize("token", token, cookieOptions);
    res.setHeader("Set-Cookie", cookieString);
  };

  simpleAuth.getToken = cookie.parse(req.headers.cookie || "").token;
  simpleAuth.decodeToken = (token, secret) => {
    try {
      return jwt.verify(token, secret);
    } catch (err) {
      return false;
    }
  };
  simpleAuth.hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  simpleAuth.verifyPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
  };
  enova.simpleAuth = simpleAuth;
}

module.exports = simpleAuth;
