function homeHandler(req, res, { simpleAuth }) {
  const title = "Default Nunjucks Template";
  res.render("src/views/home.html", { title });
}

module.exports = { homeHandler };
