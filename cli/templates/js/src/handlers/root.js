function homeHandler(req, res, { simpleAuth }) {
  const decodedToken = simpleAuth.decodedToken("secret");
  const title = "Enova Notes";
  res.render("src/views/home.html", {
    title,
    feedback: req.feedback,
    user: decodedToken.data,
  });
}
module.exports = { homeHandler };
