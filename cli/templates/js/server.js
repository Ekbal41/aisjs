const Enova = require("../../../index.js");
const nunjucks = require("nunjucks");
const app = new Enova();

app.register("assetsFolder", {
  path: "assets",
});
app.register("viewEngine", {
  name: "nunjucks",
  engine: nunjucks,
  config: {},
});

app.get("/", (req, res) => {
  const message = req.query.message;
  const msg = decodeURIComponent(message);
  res.render("views/index.html", { msg });
});
app.post("/post", (req, res) => {
  const message = "Form submitted successfully";
  console.log(req.formData);
  res.redirect("/", message);
});

// app.registerPlugins([TestPlugin]);
app.start(8000);
module.exports = app;
