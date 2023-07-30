const path = require("path");
const fg = require("fast-glob");

function homeHandler(req, res, { eAuth }) {
  const decodedToken = eAuth.getDecodedToken("secret");
  const title = "Enova Notes";
  res.render("src/views/home.html", {
    title,
    feedback: req.feedback,
    user: decodedToken.data,
  });
}

module.exports = { homeHandler };
