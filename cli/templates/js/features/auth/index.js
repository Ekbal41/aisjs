const { feature } = require("../../../../../index.js");
const handler = require("./handler.js");
module.exports = Auth = feature()
  .prefix("/auth")
  .get("/login", handler.loginView)
  .post("/login-post", handler.loginHandler)
  .get("/register", handler.registerView)
  .post("/register-post", handler.registerHandler)
  .get("/logout", handler.logoutHandler);
