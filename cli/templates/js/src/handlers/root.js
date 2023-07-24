function homeHandler(req, res, { simpleAuth }) {
  const message = decodeURIComponent(req.query.message);
  const decodedToken = simpleAuth.decodedToken("secret");
  const title = "Enova Notes";
  res.render("src/views/home.html", {
    title,
    message,
    user: decodedToken.data,
  });
}

module.exports = { homeHandler };
