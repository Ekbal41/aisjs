const prisma = require("../db/prismaClient.js");
const { validate } = require("../../../../../index.js");
// Login-----------------------------------------------------------

function loginView(req, res) {
  const title = "Login";
  res.render("src/views/auth/login.html", { title, feedback: req.feedback });
}

async function loginHandler(req, res, { simpleAuth }) {
  const { email, password } = req.formData;

  const error = validate(req.formData);
  if (error) {
    res.directTo("/auth", error);
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    const isPasswordValid = simpleAuth.verifyPassword(password, user.password);
    if (isPasswordValid) {
      simpleAuth.addToken({ email: email }, "secret", "1h");
    } else {
      res.directTo("/auth", {
        error: "Wrong credentials.",
      });
      return;
    }
  }
  res.directTo("/", {
    success: "User logged in successfully.",
  });
}

// Register-----------------------------------------------------------
function registerView(req, res) {
  const title = "Register";
  res.render("src/views/auth/register.html", { title, feedback: req.feedback });
}

async function registerHandler(req, res, { simpleAuth }) {
  const { email, password, password2 } = req.formData;
  if (!email || !password || !password2) {
    res.directTo("/auth/register", {
      email: "Email is required.",
      password: "Password is required.",
      password2: "Password confirmation is required.",
    });
    return;
  }
  if (password == password2) {
    await prisma.user.create({
      data: {
        email: email,
        password: simpleAuth.hashPassword(password),
        notes: {},
      },
    });
  }
  res.directTo("/auth", { success: "User registered successfully." });
}

// Logout-----------------------------------------------------------
function logoutHandler(req, res, { simpleAuth }) {
  simpleAuth.removeToken();
  res.directTo("/", { success: "User logged out successfully." });
}

module.exports = {
  loginHandler,
  loginView,
  registerView,
  registerHandler,
  logoutHandler,
};
