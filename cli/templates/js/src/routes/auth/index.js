const {
  loginHandler,
  loginView,
  registerView,
  registerHandler,
  logoutHandler,
} = require("../../handlers/auth.js");

const authRoutes = [
  {
    method: "GET",
    path: "/",
    mids: [],
    callback: loginView,
  },
  {
    method: "POST",
    path: "/login-post",
    mids: [],
    callback: loginHandler,
  },
  {
    method: "GET",
    path: "/register",
    mids: [],
    callback: registerView,
  },
  {
    method: "POST",
    path: "/register-post",
    mids: [],
    callback: registerHandler,
  },
  {
    method: "GET",
    path: "/logout",
    mids: [],
    callback: logoutHandler,
  },
];
module.exports = authRoutes;
