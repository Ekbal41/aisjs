const { Feature } = require("../../../../../index.js");
const handler = require("./handler.js");
const Auth = new Feature();

Auth.urlPrefix("/auth");

Auth.get("/login", handler.loginView);
Auth.post("/login-post", handler.loginHandler);
Auth.get("/register", handler.registerView);
Auth.post("/register-post", handler.registerHandler);
Auth.get("/logout", handler.logoutHandler);

module.exports = Auth;
