const { Router } = require("../../../../../index.js");
const {
  loginHandler,
  loginView,
  registerView,
  registerHandler,
  logoutHandler,
} = require("../handlers/auth.js");

const AuthRouter = new Router();

AuthRouter.get("/login", loginView);
AuthRouter.post("/login-post", loginHandler);
AuthRouter.get("/register", registerView);
AuthRouter.post("/register-post", registerHandler);
AuthRouter.get("/logout", logoutHandler);

module.exports = AuthRouter;
