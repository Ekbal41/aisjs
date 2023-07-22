function loginView(req, res) {
  const title = "Login";
  res.render("src/views/auth/login.html", { title });
}

function loginHandler(req, res, { simpleAuth }) {
  const user = {
    name: "admin",
    password: "password",
  };
  const title = "Default Nunjucks Template";
  res.render("src/views/auth/login.html", { title });
}
function registerView(req, res) {
  const title = "Register";
  res.render("src/views/auth/register.html", { title });
}

function registerHandler(req, res, { simpleAuth }) {
  const user = {
    name: "admin",
    password: "password",
  };
  const title = "Default Nunjucks Template";
  res.render("src/views/auth/register.html", { title });
}
module.exports = { loginHandler, loginView, registerView, registerHandler };

// simpleAuth.addToken({ username: "admin" }, "secret", "1h");
// console.log(simpleAuth.getToken);
// console.log(simpleAuth.hashPassword("admin"));
// console.log(
//   simpleAuth.verifyPassword("admin", simpleAuth.hashPassword("admin"))
// );
// console.log(simpleAuth.decodeToken(simpleAuth.getToken, "secret"));
