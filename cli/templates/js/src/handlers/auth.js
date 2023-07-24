const prisma = require("../db/prismaClient.js");
// Login-----------------------------------------------------------

function loginView(req, res) {
  res.render("src/views/auth/login.html", { message: req.message });
}

async function loginHandler(req, res, { simpleAuth }) {
  const { email, password } = req.formData;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    const isPasswordValid = simpleAuth.verifyPassword(password, user.password);
    if (isPasswordValid) {
      simpleAuth.addToken({ email: email }, "secret", "1h");
    }
  }
  res.directTo("/", "User logged in successfully.");
}

// Register-----------------------------------------------------------
function registerView(req, res) {
  const title = "Register";
  res.render("src/views/auth/register.html", { title });
}

async function registerHandler(req, res, { simpleAuth }) {
  const { email, password, password2 } = req.formData;
  if (password == password2) {
    await prisma.user.create({
      data: {
        email: email,
        password: simpleAuth.hashPassword(password),
        notes: {},
      },
    });
  }
  res.directTo("/auth", "User registered successfully.");
}

// Logout-----------------------------------------------------------
function logoutHandler(req, res, { simpleAuth }) {
  simpleAuth.removeToken();
  res.directTo("/", "User logged out successfully.");
}

module.exports = {
  loginHandler,
  loginView,
  registerView,
  registerHandler,
  logoutHandler,
};
